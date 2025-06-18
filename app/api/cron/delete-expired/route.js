// app/api/cron/delete-old-blobs/route.js
import { del, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Secure your cron endpoint
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Calculate cutoff time (1 hour ago)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Get all blobs
    const { blobs } = await list();

    // Filter blobs older than 1 hour
    const blobsToDelete = blobs.filter(blob => {
      const uploadDate = new Date(blob.uploadedAt);
      return uploadDate < oneHourAgo; // Only files uploaded before the cutoff
    });

    // Delete blobs in parallel
    const deletionResults = await Promise.allSettled(
      blobsToDelete.map(blob => del(blob.url))
    );

    // Count results
    const successfulDeletions = deletionResults.filter(
      result => result.status === 'fulfilled'
    ).length;

    const failedDeletions = deletionResults.filter(
      result => result.status === 'rejected'
    );

    // Log failures
    failedDeletions.forEach(result => {
      console.error('Failed to delete blob:', result.reason);
    });

    return NextResponse.json({
      success: true,
      deletedCount: successfulDeletions,
      failedCount: failedDeletions.length,
      totalProcessed: blobsToDelete.length,
      cutoffTime: oneHourAgo.toISOString(),
      message: `Deleted files older than ${oneHourAgo.toISOString()}`
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Failed to process blob deletions"
      },
      { status: 500 }
    );
  }
}

// Optionally add other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
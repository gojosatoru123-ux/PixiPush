import { handleUpload} from '@vercel/blob/client';
import { NextResponse } from 'next/server';
 
export async function POST(request){
  const body = (await request.json());
 
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
 
        return {
          allowedContentTypes: [ // Documents
            'application/pdf',
            'application/msword', // DOC
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
            'text/plain', // TXT
            
            // Images
            'image/jpeg',
            'image/png',
            'image/svg+xml', // SVG
            
            // Web Files
            'text/html',
            'text/css',
            'application/javascript', // JS
            
            // Archives
            'application/zip', // ZIP
            'application/x-rar-compressed', // RAR
            'application/x-7z-compressed' // 7Z
             ],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow
 
        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });
 
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}
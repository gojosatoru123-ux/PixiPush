const UploadedCard=(blob)=>{
    return (
        <>
         {blob && (
          <div style={{ marginTop: '10px', border: '1px solid green', padding: '10px' }}>
            <h3>Upload Successful!</h3>
            <p><strong>URL:</strong> <a href={blob.url} target="_blank" rel="noopener noreferrer">{blob.url}</a></p>
            <p><strong>Name:</strong> {blob.pathname}</p>
            <p><strong>Size:</strong> {blob.size} bytes</p>
          </div>
        )}
        </>
    )
}
export default UploadedCard;
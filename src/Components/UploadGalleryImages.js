import { useState, useRef } from "react";
import { Card, CardContent, Button, Grid } from "@material-ui/core";

import ImageGrid from "./ImageGrid";

const UploadGalleryImages = ({ upload }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLS] = useState([]);
  const fileObj = [];
  const fileArray = [];
  const previewArray = [];

  const handleUpload = () => {
    //uploads images then remove images from preview after upload completes
    upload(files);
    setPreviewURLS([]);
  };

  //sets all selected files to state
  const handleMultipleImageSelect = (e) => {
    fileObj.push(e.target.files);
    //literates through files from input element
    for (let i = 0; i < fileObj[0].length; i++) {
      //pushes the file to fileArray
      fileArray.push(fileObj[0][i]);
      //creates a POJO with url key and sets value to local url for previews
      previewArray.push({
        url: URL.createObjectURL(fileObj[0][i]),
      });
    }
    setPreviewURLS(previewArray);
    setFiles(fileArray);
  };

  return (
    <Card>
      <CardContent>
        <h4>Upload New Images</h4>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                fileInputRef.current.click();
                // console.log("REF", fileInputRef.click);
              }}
            >
              Select images for upload
            </Button>

            <input
              label="Image"
              type="file"
              multiple={true}
              accept="image/jpeg"
              name="pic"
              hidden={true}
              onChange={(e) => handleMultipleImageSelect(e)}
              ref={fileInputRef}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={!previewURLs.length}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <p>{previewURLs.length} images ready for upload</p>
        <ImageGrid images={previewURLs} />
      </CardContent>
    </Card>
  );
};

export default UploadGalleryImages;

var ImageUploader = function(canvasHTMLId, imageLinkContainerHTMLId) {
  this.canvasToUpload = canvasHTMLId
  this.locationToAppendLinksTo = $('#'+imageLinkContainerHTMLId)
}

ImageUploader.prototype.retrieveHTMLobject = function() {
  return document.getElementById(this.canvasToUpload)
}

ImageUploader.prototype.uploadToImgurAndAppendLinksToScreen = function() {
  var canvasHTMLObject = this.retrieveHTMLobject()
  var base64EncodedImageString = this.convertToBase64(canvasHTMLObject)
  var userImageTitle = prompt('What would you like to name your Nyanagram?')
  this.imgurAjaxRequest(base64EncodedImageString, userImageTitle)
}

ImageUploader.prototype.convertToBase64 = function(canvasHTMLObject) {
  return canvasHTMLObject.toDataURL('image/png', 1.0).replace("data:image/png;base64,", "")
}

ImageUploader.prototype.appendLinksToScreen = function(imgurPageImage, whiteBackgroundUploadedImage, blackBackgroundUploadedImage, miniIcon) {
  this.locationToAppendLinksTo.append('<li><a href="'+imgurPageImage+'" target="_blank">Your Nyanagram on imgur.com</a></li>')
  this.locationToAppendLinksTo.append('<li><a href="'+whiteBackgroundUploadedImage+'" target="_blank">White background</a></li>')
  this.locationToAppendLinksTo.append('<li><a href="'+blackBackgroundUploadedImage+'" target="_blank">Black background</a></li>')
  this.locationToAppendLinksTo.append('<li><a href="'+miniIcon+'" target="_blank">Mini Icon</a></li>')
}

ImageUploader.prototype.imgurParseAndAppend = function(imgurReturnData) {
  var imgurPageImage = imgurReturnData.upload.links.imgur_page
  var blackBackgroundUploadedImage = imgurReturnData.upload.links.large_thumbnail
  var whiteBackgroundUploadedImage = imgurReturnData.upload.links.original
  var miniIcon = imgurReturnData.upload.links.small_square
  self.appendLinksToScreen(imgurPageImage, whiteBackgroundUploadedImage, blackBackgroundUploadedImage, miniIcon)
  self.turnContainerIntoADialog()
}

ImageUploader.prototype.imgurAjaxRequest = function(base64EncodedImageString, userImageTitle) {
  self = this
  $.ajax({
    url: 'http://api.imgur.com/2/upload.json',
    type: 'POST',
    data: {
      type: 'base64',
      key: 'bf880aa11869154f1772cea2d3bdcc31',
      title: userImageTitle,
      caption: 'https://codewithnyan.com',
      image: base64EncodedImageString
    },
    dataType: 'json'
  }).success(self.imgurParseAndAppend).error(function() {
    alert('We could not save your image. Sorry :( we are working to fix this problem.');
    w.close();
  });
}

ImageUploader.prototype.turnContainerIntoADialog = function() {
  this.locationToAppendLinksTo.dialog({
    title: "Your Nyanagrams",
    width: 400
  })
}
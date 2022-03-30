function imgCheckURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export default imgCheckURL;
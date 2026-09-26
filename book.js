document.addEventListener('DOMContentLoaded', () => {
  const pageFlip = new St.PageFlip(
    document.getElementById('book'),
    {
      width: 400,
      height: 600,
      size: "fixed",
      minWidth: 300,
      maxWidth: 1000,
      minHeight: 400,
      maxHeight: 1200,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false
    }
  );

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});

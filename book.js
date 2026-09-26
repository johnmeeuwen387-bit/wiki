document.addEventListener('DOMContentLoaded', () => {
  const pageFlip = new St.Pageflip(
    document.getElementbyId('book'),
    {
      width: 400,
      height: 600,
      size: "fixed",
      minWidth: 300,
      maxWidth: 1000,
      minWidth: 400,
      maxHeight: 1200,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: true
    }
    );
  pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});

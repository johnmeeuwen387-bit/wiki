document.addEventListener('DOMContentLoaded', () => {
  const pageFlip = new St.PageFlip(
    document.getElementById('book'),
    {
      width: 400,
      height: 600,
      size: "fixed",
      showCover: true
    }
  );

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});

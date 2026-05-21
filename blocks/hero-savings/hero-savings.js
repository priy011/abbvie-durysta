export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[1];
  if (!imageRow || !imageRow.querySelector('picture')) {
    block.classList.add('no-image');
  }
}

import { Icons } from './icons.interface';

export const chevron_down = (props: Icons) => {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="${props.color ? props.color : 'currentColor'}"
  class='${props.className}'
  ${props.width && 'width=' + props.width}
  ${props.height && 'height=' + props.height}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="m19.5 8.25-7.5 7.5-7.5-7.5"
  />
</svg>
  `;
};

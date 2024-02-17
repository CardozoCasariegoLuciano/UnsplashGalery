import { Icons } from './icons.interface';

export const arrowLeft = (props: Icons) => {
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="${props.color ? props.color : 'currentColor'}"
  class='${props.className}'
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  />
</svg>
  `;
};

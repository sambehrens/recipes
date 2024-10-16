import { IconObject } from "./icons";

type IconProps = {
  icon: IconObject;
};

export function Icon(props: IconProps) {
  return (
    <svg
      className="icon"
      style={{
        width: `${props.icon.width / props.icon.height}em`,
      }}
      width={props.icon.width}
      height={props.icon.height}
      viewBox={`0 0 ${props.icon.width} ${props.icon.height}`}
    >
      <path fill="currentColor" d={props.icon.path} />
    </svg>
  );
}

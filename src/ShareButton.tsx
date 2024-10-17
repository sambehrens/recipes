import { useMemo } from "react";
import { Icon } from "./Icon";
import { clipboard, share } from "./icons";

type ShareButtonProps = {
  text?: string;
  url: string;
  title: string;
};

export function ShareButton(props: ShareButtonProps) {
  let shareApiAvailable = useMemo(() => {
    return (
      "canShare" in navigator &&
      "share" in navigator &&
      navigator.canShare(props)
    );
  }, [props.text]);
  console.log(shareApiAvailable);
  return (
    <>
      {shareApiAvailable && (
        <button className="link inline-flex items-center justify-center gap-xs" onClick={() => navigator.share(props)}>
          <Icon icon={share} /> Share
        </button>
      )}
      <button className="link inline-flex items-center justify-center gap-xs" onClick={() => navigator.clipboard.writeText(props.url)}>
        <Icon icon={clipboard} /> Copy link
      </button>
    </>
  );
}

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { clipboard, share } from "./icons";

type ShareButtonProps = {
  text?: string;
  url: string;
  title: string;
};

export function ShareButton(props: ShareButtonProps) {
  const [shareApiAvailable, setShareApiAvailable] = useState(false);

  useEffect(() => {
    let available = false;
    try {
      available =
        "canShare" in navigator &&
        "share" in navigator &&
        navigator.canShare(props);
    } catch (err) {
      available = false;
    }
    setShareApiAvailable(available);
  }, [props.text, props.url, props.title]);

  return (
    <>
      {shareApiAvailable && (
        <button
          className="link inline-flex items-center justify-center gap-xs"
          onClick={() => {
            try {
              navigator.share(props);
            } catch (err) {
              // do nothing
            }
          }}
        >
          <Icon icon={share} /> Share
        </button>
      )}
      <button
        className="link inline-flex items-center justify-center gap-xs"
        onClick={() => {
          try {
            navigator.clipboard.writeText(props.url);
          } catch (err) {
            // do nothing
          }
        }}
      >
        <Icon icon={clipboard} /> Copy link
      </button>
    </>
  );
}

import Tooltip, { TooltipProps } from "./Tooltip";

type ConditionalTooltipProps = TooltipProps & {
    renderTooltip: boolean;
    };

const ConditionalTooltip = ({
  displayText,
  children,
  renderTooltip,
}: ConditionalTooltipProps) => {
  if (renderTooltip) {
    return <Tooltip displayText={displayText}>{children}</Tooltip>;
  } else {
    return <>{children}</>;
  }
};

export default ConditionalTooltip;

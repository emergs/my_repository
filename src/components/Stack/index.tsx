import { StackCard } from "./style";
import { Text } from "@/styles/Text";
import { IconType } from "react-icons/lib";

interface StackProps {
  title: string;
  icon: string | IconType;
  key: number;
  colors: string | undefined;
}

export const Stack = (
  { colors, title, icon: Icon }: StackProps,
  key: number
): JSX.Element => {
  const isString = typeof Icon === "string";

  return (
    <StackCard className={`${key}`} key={key}>
      <Text>{title}</Text>
      {isString ? (
        <img src={Icon} alt={title} title={title} height="70px" width="70px" color={colors} />
      ) : (
        <Icon size={84} color={colors} />
      )}
    </StackCard>
  );
};

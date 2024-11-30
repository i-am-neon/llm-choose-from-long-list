import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  content: string | ReactNode;
}

const ResultCard = ({ title, content }: ResultCardProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <code>{content}</code>
      </CardContent>
    </Card>
  );
};

export default ResultCard;


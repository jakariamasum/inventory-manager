import React from "react";
import { Badge } from "./ui/badge";

const Title = ({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="text-center space-y-4 mb-16">
      <Badge variant="outline" className="px-4 py-2">
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;

import React from 'react'
import { Card } from "flowbite-react";

export default function StaffTpeCard({
  description,
  id,
  isDeleted,
  isStopNotUse,
  nameCategory,
}) {
  return (
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {nameCategory}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
  );
}

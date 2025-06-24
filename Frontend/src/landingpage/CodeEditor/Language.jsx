import * as React from "react"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Language({ className,onLanguageChange }) {

  return (
    <Select className={className} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[180px] bg-gray-900 text-white font-bold">
        <SelectValue placeholder="Choose Your Language" />
      </SelectTrigger>
      <SelectContent className="bg-black">
        <SelectGroup className="bg-black text-white ">
          <SelectLabel >  Language</SelectLabel>
          <SelectItem value="C">C</SelectItem>
          <SelectItem value="C++" selected>
            C++
          </SelectItem>
          <SelectItem value="Java">Java</SelectItem>
          <SelectItem value="JavaScript">JavaScript</SelectItem>
          <SelectItem value="Ruby">Ruby</SelectItem>
          <SelectItem value="Python">Python</SelectItem>
          <SelectItem value="Go">Go</SelectItem>
          <SelectItem value="C#">C#</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

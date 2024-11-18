import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Settings2 } from "lucide-react";

import { LLMModel, LLMModelConfig } from "@/lib/model";
import "core-js/features/object/group-by.js";
import Image from "next/image";

export function LLMPicker({
  models,
  languageModel,
  onLanguageModelChange,
}: {
  models: LLMModel[];
  languageModel: LLMModelConfig;
  onLanguageModelChange: (config: LLMModelConfig) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <Select
          name="languageModel"
          defaultValue={languageModel.model}
          onValueChange={(e) => onLanguageModelChange({ model: e })}
        >
          <SelectTrigger className="whitespace-nowrap border-none shadow-none focus:ring-0 px-0 py-0 h-6 text-xs">
            <SelectValue placeholder="Language model" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Object.entries(
              Object.groupBy(models, ({ provider }) => provider)
            ).map(([provider, models]) => (
              <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center space-x-2">
                      <Image
                        className="flex"
                        src={`/thirdparty/logos/${model.providerId}.svg`}
                        alt={model.provider}
                        width={14}
                        height={14}
                      />
                      <span>{model.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function LLMSettings({
  apiKeyConfigurable,
  baseURLConfigurable,
  languageModel,
  onLanguageModelChange,
}: {
  apiKeyConfigurable: boolean;
  baseURLConfigurable: boolean;
  languageModel: LLMModelConfig;
  onLanguageModelChange: (model: LLMModelConfig) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground h-6 w-6 rounded-sm"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {apiKeyConfigurable && (
          <>
            <div className="flex flex-col gap-2 px-2 py-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                name="apiKey"
                type="password"
                placeholder="Auto"
                required={true}
                defaultValue={languageModel.apiKey}
                onChange={(e) =>
                  onLanguageModelChange({
                    apiKey:
                      e.target.value.length > 0 ? e.target.value : undefined,
                  })
                }
                className="text-sm"
              />
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        {baseURLConfigurable && (
          <>
            <div className="flex flex-col gap-2 px-2 py-2">
              <Label htmlFor="baseURL">Base URL</Label>
              <Input
                name="baseURL"
                type="text"
                placeholder="Auto"
                required={true}
                defaultValue={languageModel.baseURL}
                onChange={(e) =>
                  onLanguageModelChange({
                    baseURL:
                      e.target.value.length > 0 ? e.target.value : undefined,
                  })
                }
                className="text-sm"
              />
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="flex flex-col gap-1.5 px-2 py-2">
          <span className="text-sm font-medium">Parameters</span>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">
              Output tokens
            </span>
            <Input
              type="number"
              defaultValue={languageModel.maxTokens}
              min={50}
              max={10000}
              step={1}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  maxTokens: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">
              Temperature
            </span>
            <Input
              type="number"
              defaultValue={languageModel.temperature}
              min={0}
              max={5}
              step={0.01}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  temperature: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">Top P</span>
            <Input
              type="number"
              defaultValue={languageModel.topP}
              min={0}
              max={1}
              step={0.01}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  topP: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">Top K</span>
            <Input
              type="number"
              defaultValue={languageModel.topK}
              min={0}
              max={500}
              step={1}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  topK: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">
              Frequence penalty
            </span>
            <Input
              type="number"
              defaultValue={languageModel.frequencyPenalty}
              min={0}
              max={2}
              step={0.01}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  frequencyPenalty: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
          <div className="flex space-x-4 items-center">
            <span className="text-sm flex-1 text-muted-foreground">
              Presence penalty
            </span>
            <Input
              type="number"
              defaultValue={languageModel.presencePenalty}
              min={0}
              max={2}
              step={0.01}
              className="h-6 rounded-sm w-[84px] text-xs text-center tabular-nums"
              placeholder="Auto"
              onChange={(e) =>
                onLanguageModelChange({
                  presencePenalty: parseFloat(e.target.value) || undefined,
                })
              }
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
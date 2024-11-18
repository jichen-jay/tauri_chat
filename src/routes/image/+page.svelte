<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import { Loader2, Sparkles } from "lucide-svelte";

  const apiKey = localStorage.getItem("gemini") as string;

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt = $state("");
  let imageFile: File | null = null;
  let fileUri: string | null = null; // Store the file URI here
  let loading = $state(false);
  let errorMessage = $state("");

  let result: string = $state("");

  async function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      imageFile = target.files[0];
    }
  }

  async function handleSubmit() {
    if (!apiKey) {
      alert("Please add your Google API key in the settings");
      return;
    }

    if (prompt.length < 3) {
      alert("Prompt is too short");
      return;
    }

    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    loading = true;
    try {
      // Read the image file and convert it to base64
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(",")[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile!);
      });

      // Create the image object with inline data
      const image = {
        inlineData: {
          data: imageBase64,
          mimeType: imageFile!.type,
        },
      };

      // Generate content with the prompt and image
      const response = await model.generateContent([image, "\n\n", prompt]);

      result = response.response.text();
      console.log(result);
    } catch (error: any) {
      console.error(error);
      errorMessage = "An error occurred while processing the image.";
    } finally {
      loading = false;
    }
  }
</script>

<div>
  <div class="mt-5 p-3">
    <div class="container w-full max-w-4xl space-y-2 rounded-lg border p-3">
      <div class="space-y-2">
        <Label>Prompt</Label>
        <Textarea
          bind:value={prompt}
          class="resize-none"
          placeholder="Ask something about the image"
        />
      </div>

      <div class="space-y-2">
        <Label>Upload Image</Label>
        <input type="file" accept="image/*" onchange={handleImageUpload} />
      </div>

      <div class="flex items-center justify-center">
        <Button
          variant="secondary"
          class="w-96 border border-foreground/40"
          type="submit"
          onclick={handleSubmit}
          disabled={loading}
        >
          {#if loading}
            Processing...
            <Loader2 class="ml-3 h-5 w-5 animate-spin" />
          {:else}
            Submit
            <Sparkles class="ml-3 h-5 w-5" />
          {/if}
        </Button>
      </div>
    </div>
  </div>

  <div class="mt-10 flex items-center justify-center w-full">
    {#if loading}
      <span class="loader"></span>
    {:else if result}
        <Card.Card class="overflow-hidden rounded-xl w-full">
          <Card.CardHeader class="p-4">
            <h3 class="text-lg font-semibold">Response</h3>
          </Card.CardHeader>
          <Card.CardContent class="p-4">
            <Textarea
              bind:value={result}
              class="resize-none w-full"
              readonly
              rows="20"
            />
          </Card.CardContent>
        </Card.Card>
    {/if}
  </div>
</div>

<style>
  .loader {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    color: #1681d2;
  }
  .loader:before,
  .loader:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
  }
  .loader:after {
    color: #ff3d00;
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes spin {
    0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
</style>

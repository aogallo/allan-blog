const mermaidSyntax = /^(flowchart|sequenceDiagram|stateDiagram-v2|pie)\b/;

const mermaidBlocks = Array.from(document.querySelectorAll("pre")).filter(
  block => mermaidSyntax.test(block.textContent?.trim() ?? "")
);

if (mermaidBlocks.length) {
  const { default: mermaid } = await import("mermaid");

  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "strict",
  });

  mermaidBlocks.forEach(block => {
    const wrapper = document.createElement("div");
    wrapper.className = "mermaid my-8 overflow-x-auto rounded-lg p-4";
    wrapper.textContent = block.textContent ?? "";
    block.replaceWith(wrapper);
  });

  await mermaid.run({ querySelector: ".mermaid" });
}

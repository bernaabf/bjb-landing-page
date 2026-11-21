import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const componentSource = fs.readFileSync(
  path.resolve(process.cwd(), "src/components/ValueAndConversionSection.tsx"),
  "utf8"
);

describe("ConversionSection accessibility and responsive CTA contract", () => {
  test("wires aria-describedby and aria-invalid across all 3 mandatory controls", () => {
    assert.match(componentSource, /id="diag-nome-error"/);
    assert.match(componentSource, /aria-describedby=\{fieldErrors\.nome \? "diag-nome-error" : undefined\}/);

    assert.match(componentSource, /id="diag-produtos-error"/);
    assert.match(componentSource, /<fieldset[\s\S]*aria-invalid=\{Boolean\(fieldErrors\.produtos\)\}/);
    assert.match(
      componentSource,
      /<fieldset[\s\S]*aria-describedby=\{fieldErrors\.produtos \? "diag-produtos-error" : undefined\}/
    );

    assert.match(componentSource, /id="diag-objetivo-error"/);
    assert.match(
      componentSource,
      /aria-describedby=\{fieldErrors\.objetivo \? "diag-objetivo-error" : undefined\}/
    );
  });

  test("allows submit CTA label to wrap on narrow mobile screens instead of unconditional nowrap", () => {
    const submitBlockMatch = componentSource.match(
      /type="submit"[\s\S]*?Entenda a melhor proposta para você/
    );
    assert.ok(submitBlockMatch, "Expected submit button block");
    assert.ok(
      !submitBlockMatch[0].includes(" whitespace-nowrap "),
      "Submit button must not use unconditional whitespace-nowrap"
    );
    assert.ok(
      submitBlockMatch[0].includes("sm:whitespace-nowrap"),
      "Submit button should restrict nowrap to sm: and larger viewports"
    );
  });

  test("uses requestDiagnosticWithFallback so slow API calls fall back cleanly", () => {
    assert.match(componentSource, /requestDiagnosticWithFallback\(/);
  });
});

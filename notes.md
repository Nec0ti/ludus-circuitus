# Project notes

This is the project's working knowledge base. New information from Necati should be organized here with its source and confidence preserved. Keep decisions, hypotheses, and questions distinct.

## Project idea

**Working description:** a beginner-friendly visual tool that makes learning Verilog and digital logic feel approachable like Scratch. A learner assembles logic visually and can inspect the corresponding Verilog and what the circuit does.

This wording captures the idea, not a finalized product specification or TÜBİTAK application.

## Initial MVP hypothesis

The smallest useful demonstration may support:

- named input and output signals;
- AND, OR, NOT, and XOR gates with visual connections;
- a readable circuit/logic view;
- generated Verilog corresponding to the visual circuit;
- a truth table or simple simulation to show behavior.

Begin with combinational logic. Add clocks, registers, sequential behavior, or programming a physical FPGA only after the core demonstration is working and the team agrees it is needed.

## Possible research direction

**Question to refine:** Does constructing simple logic with visual blocks, alongside immediate circuit and Verilog views, help beginner learners understand basic digital logic?

Possible measures to evaluate later include pre/post concept questions, circuit correctness, completion time, and errors. This is only a candidate study design; learner group, method, and approvals are unresolved.

## Confirmed decisions

- None recorded yet.

## Assumptions and proposals

- The first prototype can focus on combinational circuits and introductory gates.
- Showing both generated Verilog and circuit behavior may be a useful distinction from block programming alone.

## Open questions

- Who is the first learner group, and what should they learn by the end of a short activity?
- Which visual editor interaction is simplest for a first demo: snap-together blocks, a gate canvas, or another format?
- Should Verilog be generated from a circuit model, or should learners also be able to edit the code?
- What is the simplest trustworthy way to simulate/check generated circuits?
- What exact deliverable, timeline, team roles, and research method does the team want?
- What current TÜBİTAK and school requirements apply, including approvals and consent if learners participate?

## Sources

- Prior project planning captured in the Second Brain note `notes/tubitak-fpga-egitim-araci.md` (historical handoff; not copied here as a primary source). Its MVP suggestion was inputs/outputs, AND/OR/NOT/XOR, circuit visualization, live Verilog, and truth-table/simulation; its research framing and participant safeguards remain proposals to verify.
- Current official project-guide and school requirements have not yet been rechecked for this workspace. Confirm them before relying on deadlines, eligibility, or approval claims.

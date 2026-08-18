import { isSessionComplete } from "./session-status";
import type { Task } from "@/types/session";

function makeTask(overrides: Partial<Task>): Task {
  return { id: "t1", title: "Task", completed: false, ...overrides };
}

describe("isSessionComplete", () => {
  it("retorna false para uma sessão sem tasks", () => {
    expect(isSessionComplete([])).toBe(false);
  });

  it("retorna false quando pelo menos uma task está incompleta", () => {
    const tasks = [
      makeTask({ id: "t1", completed: true }),
      makeTask({ id: "t2", completed: false }),
    ];
    expect(isSessionComplete(tasks)).toBe(false);
  });

  it("retorna true quando todas as tasks estão completas", () => {
    const tasks = [
      makeTask({ id: "t1", completed: true }),
      makeTask({ id: "t2", completed: true }),
    ];
    expect(isSessionComplete(tasks)).toBe(true);
  });
});

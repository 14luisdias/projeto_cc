import { revalidatePath } from "next/cache";
import { toggleTaskAction } from "./toggle-task";
import { toggleTaskCompletion } from "../_data-access/get-sessions";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("../_data-access/get-sessions", () => ({
  toggleTaskCompletion: jest.fn(),
}));

const mockedToggle = toggleTaskCompletion as jest.MockedFunction<
  typeof toggleTaskCompletion
>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("toggleTaskAction", () => {
  it("marca/desmarca a task e revalida a página quando encontrada", async () => {
    mockedToggle.mockResolvedValue({ found: true });

    const result = await toggleTaskAction("sessao-1", "task-1-1");

    expect(mockedToggle).toHaveBeenCalledWith("sessao-1", "task-1-1");
    expect(revalidatePath).toHaveBeenCalledWith("/sessoes");
    expect(result).toEqual({ success: true });
  });

  it("retorna erro sem revalidar quando sessão/task não existe", async () => {
    mockedToggle.mockResolvedValue({ found: false });

    const result = await toggleTaskAction("sessao-inexistente", "task-x");

    expect(revalidatePath).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it("retorna erro de validação para IDs inválidos sem tocar o data-access", async () => {
    const result = await toggleTaskAction("", "");

    expect(mockedToggle).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
    expect(result.success).toBe(false);
  });
});

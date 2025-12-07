import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test/utils";
import Navbar from "../Navbar";
import { useUser } from "../../../queries/revenue.queries";
import { mockUser } from "../../../test/mockData";

vi.mock("../../../queries/revenue.queries", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../../assets/logos/mainstack-logo.svg", () => ({
  default: "mainstack-logo.svg",
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUser).mockReturnValue({
      data: mockUser,
      isLoading: false,
      isError: false,
      error: null,
    } as any);
  });

  it("should render navbar with logo", () => {
    renderWithProviders(<Navbar />);

    const logo = screen.getByAltText("Mainstack Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("CRM")).toBeInTheDocument();
    expect(screen.getByText("Apps")).toBeInTheDocument();
  });

  it("should render notification and chat buttons", () => {
    renderWithProviders(<Navbar />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(2);
  });

  it("should display user initials when user data is loaded", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText("OJ")).toBeInTheDocument();
  });

  it("should show skeleton when user data is loading", () => {
    vi.mocked(useUser).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    const { container } = renderWithProviders(<Navbar />);

    const skeleton = container.querySelector(".bg-gray-50");
    expect(skeleton).toBeInTheDocument();
  });

  it("should open profile menu when profile button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const profileButton = screen.getByText("OJ").closest("button");
    if (profileButton) {
      await user.click(profileButton);
    }

    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  it("should display all profile menu options", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const profileButton = screen.getByText("OJ").closest("button");
    if (profileButton) {
      await user.click(profileButton);
    }

    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Purchase History")).toBeInTheDocument();
      expect(screen.getByText("Refer and Earn")).toBeInTheDocument();
      expect(screen.getByText("Integrations")).toBeInTheDocument();
      expect(screen.getByText("Report Bug")).toBeInTheDocument();
      expect(screen.getByText("Switch Account")).toBeInTheDocument();
      expect(screen.getByText("Sign Out")).toBeInTheDocument();
    });
  });

  it("should close profile menu when clicking outside", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <div>
        <Navbar />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const profileButton = screen.getByText("OJ").closest("button");
    if (profileButton) {
      await user.click(profileButton);
    }

    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    const outside = screen.getByTestId("outside");
    await user.click(outside);

    await waitFor(() => {
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    });
  });

  it("should expand Apps menu when Apps button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const appsButton = screen.getByText("Apps").closest("button");
    if (appsButton) {
      await user.click(appsButton);
    }

    await waitFor(() => {
      expect(screen.getByText("Link In Bio")).toBeInTheDocument();
    });
  });

  it("should display Link In Bio menu options when expanded", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    const appsButton = screen.getByText("Apps").closest("button");
    if (appsButton) {
      await user.click(appsButton);
    }

    await waitFor(() => {
      expect(screen.getByText("Link in Bio")).toBeInTheDocument();
      expect(screen.getByText("Store")).toBeInTheDocument();
      expect(screen.getByText("Media Kit")).toBeInTheDocument();
      expect(screen.getByText("Invoicing")).toBeInTheDocument();
    });
  });
});

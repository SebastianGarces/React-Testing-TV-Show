import React from "react";
import {
    render,
    fireEvent,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { fetchShow as mockFetchShow } from "./api/fetchShow";

import App from "./App";
import Episodes from "./components/Episodes";

jest.mock("./api/fetchShow");

test("App fetches show data and render data", async () => {
    //fetchShow
    const mockData = {
        data: {
            name: "test1",
            image: { medium: "test1", original: "test1" },
            summary: "this is test summary 1",
            _embedded: { episodes: [{ season: 1 }, { season: 2 }] },
        },
    };

    mockFetchShow.mockResolvedValueOnce(mockData);

    const { getByText } = render(<App />);

    await waitForElementToBeRemoved(() => getByText(/fetching/i));
});

test("Episodes receives data and renders episodes", async () => {
    const mockData = {
        data: {
            name: "test1",
            image: { medium: "test1", original: "test1" },
            summary: "this is test summary 1",
            _embedded: {
                episodes: [
                    { season: 1, id: 1 },
                    { season: 2, id: 2 },
                ],
            },
        },
    };

    mockFetchShow.mockResolvedValueOnce(mockData);

    const { getAllByTestId } = render(
        <Episodes episodes={mockData.data._embedded.episodes} />
    );

    await waitFor(() => expect(getAllByTestId(/episodes/i)).toHaveLength(2));
});

import {act, render, screen} from "@testing-library/react";
import GoodBadCounter from "./GoodBadCounter";

test('Should render state', async () => {
    await act(()=>{
        return render(
            <GoodBadCounter bad={0} max={1} good={2} separator=':'/>
        )
    });
    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/:.*:/i)).toBeInTheDocument();
})

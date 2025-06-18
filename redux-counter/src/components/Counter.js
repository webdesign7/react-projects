import { decrement, increment, incrementByAmount, selectCount} from "../store/slices/counterSlice";
import { useSelector, useDispatch } from 'react-redux';
import {useState} from "react";


export function Counter() {

    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div>
            <div>
                <button
                    onClick={() => dispatch(increment())}
                    className="button">+</button>
                <span>{count}</span>
                <button
                    onClick={() => dispatch(decrement())}
                    className="button">-</button>
            </div>

            <div>
                <input value={incrementAmount}
                       onChange={e => setIncrementAmount(e.target.value)}
                />

                <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))} className="button">+
                    Add amount
                </button>
            </div>
        </div>
    )
}
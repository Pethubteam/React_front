import { useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>숫자증가</button>
            <p>현재숫자:{count}</p>
        </div>
    );
}
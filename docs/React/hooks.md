# React Hooks Interview Questions

![React Lifecycle](../assets/react-lifecycle.png)

### 1. What is useState?

**Answer:**  
`useState` is a React Hook that lets you add state to functional components.

**Sample Code:**

```jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Click</button>;
```

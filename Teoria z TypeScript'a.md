# TypeScript w React

## Stworzenie projektu

Aby stworzyć projekt reactowy z wstępnie skonfigurowanym TypeScriptem wykorzystamy skrypt CRA

```
npx create-react-app name-of-app --template typescript
```

## Typowanie komponentów

Najczęściej używane typy do określania kształtu danych:

```ts
type BasicProps = {
  message: string;
  age: number;
  isDisabled: boolean;
  names: string[]; //tablice typów bazowych
  status: "loading" | "error" | "success"; // unia typu słownik
  sampleAnimal: {
    name: string;
    age: number;
  }; // typowanie kluczy i wartości w obiekcie
  sampleAnimalArr: {
    name: string;
    age: number;
  }[]; //tablice obiektów
  function: () => void; //funkcje nie zwracające nic
  callback: (a: number) => number; //funkcja przyjmująca parametr a będący numerem i zwracająca zmienną typu number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  optional?: number; // typ opcjonalny
};
```

Najczęściej przekazywane typy do komponentów:

```ts
interface ComponentProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  props: Props & React.ComponentPropsWithoutRef<"button">;
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>;
}
```

W jednym przykładzie zacząłem od słówka type, a w drugim interface. Teoretycznie nie różni się to niczym oprócz składni, natomiast jest kilka wskazówek kiedy używać interface, a kiedy type, które chciałbym tutaj przytoczyć.<br />
Zawsze używaj interface dla API publicznych albo bibliotek zewnętrznych, ponieważ to pozwala na rozszerzanie ich innym za pomocą tzw. "declaration merging" np.

```ts
interface Props1 {
  age: number;
}
interface Props1 {
  name: string;
}
```

wygeneruje nam w runtime

```ts
interface Props1 {
  age: number;
  name: string;
}
```

Typów używaj do swoich komponentów reactowych i gdy potrzebujesz tzw. aliasu czyli innej nazwy dla interfejsu lub typu. Pamiętaj, że typu nie można rozszerzać (extends) przez interfejs. Typy możemy również mapować, za pomocą utility types, o których będzie później. <br />
Przejdźmy do otypowania pierwszego komponentu.

```js
type SampleComponentProps = {
  message: string,
};
const SampleComponent = ({ message }: SampleComponentProps) => (
  <div>{message}</div>
);
```

W wielu miejscach możesz spotkać się z typem React.FC, który przed React 18 dodawał do definicji również opcjonalnego childrena. Nie zawsze chcemy, aby nasz komponent przyjmował dzieci, a on to nieświadomie nam umożliwiał.

## Hooki

### useState

```js
const [state, setState] = useState(3);
//'state' zostanie wywnioskowany, czyli zinferowany przez TypeScripta
//'setState' przyjmie tylko liczby
```

Wiele hooków jest generycznych, czyli możemy przekazać do niego typ, typ też może być unią typów

```js
const [user, setUser] = (useState < User) | (null > null);
```

Przy podawaniu pustej tablicy musimy podać typ generyczny. Bez niego TypeScript wywnioskuje, że stan będzie typu never[], co skutkuje tym, że nie będzie można ustawić nowego stanu.

```js
const [messages,setMessages]=useState<SingleMessage[]>([])
```

### useReducer

W useReducerze możemy otypować najpierw funkcję reducera

```js
import { useReducer } from "react";

const initialState = { count: 0 };

type ActionType =
  | { type: "increment", payload: number }
  | { type: "decrement", payload: number };

function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
```

Dzięki temu w komponencie otrzymamy później podpowiadanie składni

```js
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```

### useRef

UseRef zwraca referencję typu read-only albo mutowalną referencję, w zależności czy argument początkowy pokrywa przekazany typ czy nie.

#### ref do elementu DOMu

Jeżeli to możliwe przekazujemy najbardziej dokładny typ elementu np. HTMLInputElement jest lepszy niż HTMLElement, ale oba typy będą prawidłowe.

```js
function Example() {
  const inputRef = useRef < HTMLInputElement > null;
  return <input ref={inputRef} type="text" name="text" />;
}
```

#### ref jako mutowalna wartość

```js
function Example2(){
    const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(...);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <button onClick={/* clearInterval the ref */}>Cancel timer</button>
}
```

### ref do innego komponentu Reactowego

Do przekazania refa do innego komponentu potrzebujemy mechanizmu forwardRef, jest to przekazywanie refa do do dziecka danego komponentu. <br />

Zacznijmy od komponentu Button

```js
import { ReactNode } from "react";

type BtnProps = { children: ReactNode, type: "submit" | "button" };

export const Button = ({ type, children }: BtnProps) => {
  return <button type={type}>{children}</button>;
};
```

Dodajmy do komponentu możliwość przekazywania refa za pomoca mechanizmu forwardingRef.

```js
import {ReactNode,forwardRef} from "react"

type BtnProps={children: ReactNode, type: 'submit'|'button'}

export const Button=forwardRef<HTMLButtonElement, Props>(props,ref)=>{
  return <button ref={ref} type={props.type}>{props.children}</button>
}
```

Dodajemy forwardRef aby przekazać ref jako props, a potem przekazać go niżej. ForwardRef jest generykiem zdefiniowanym w typach reacta.

```js
// react.d.ts
function forwardRef<T, P = {}>(
  Component: RefForwardingComponent<T, P>
): ComponentType<P & ClassAttributes<T>>
```

- T - to DOM element,
- P - to propsy,
- typ zwracany zwraca komponent z refem i atrybutami <br/>
  Teraz mozemy użyć tego komponentu i przekazać mu ref.

```js
const App=()=>{
  const ref=createRef<HTMLButtonElement>();
  return <Button ref={ref} type="button" >Click me!</Button>
}
```

### ContextAPI

```js
type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>,
};
const ThemeContext = (createContext < ThemeContextType) | (null > null);

const ThemeProvider = ({ children }: { children: React.ReactChild }) => {
  const [theme, setTheme] = useState < Theme > "light";

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Custom Hooki

Na przykładzie useFetch pokaże, jak można wykorzystać generyki do prawidłowego otypowania funkcji.

```js
export function useFetch<T>(url:string){
    const [data,setData]=useState<T[]>([])

    useEffect(()=>{
        fetch(url).then(resp=>resp.json()).then(data=>setData(data as T[]))
    },[])

    return {data}
}

interface Resp {
    id: string;
    name: string;
    body: string;
}
const {data}=useFetch<Resp>("url")
```

Zwróć uwagę na konieczną asercję w ostatnim thenie, jest ona konieczna ponieważ z api zawsze wywnioskowywany jest typ any.

## Otypowany ErrorBoundary

```js
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Migracja projektu do Typescriptu

1. Dodać TypeScript do projektu:

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

2. Wygenerować plik tsconfig.json

```
npx tsc --init
```

3. W pliku tsconfig.json włączamy zasady:

```
"noImplicitAny": true,
"strictNullChecks": true,
"noImplicitThis": true,
"alwaysStrict": true
```

Teraz możemy konwertować pliki .js na pliki .ts i pliki .jsx na pliki .tsx i otypowywać. 4. Aby zachować czystość kodu możemy też włączyć reguły:

```
"noUnusedLocals": true
"noUnusedParameters": true
"noImplicitReturns": true
```

pozwala to wykluczyć definiowanie nieużywanych zmiennych, tworzenie nieużywanych funkcji, zwracanie niejawnych wartości z funkcji

## TS w formiku

```js
import { useFormik, FormikProps } from 'formik';
import { InferType, string, object, number } from 'yup';
import TextField from '@mui/material/TextField';

const yupSchema = object({
  name: string().required('Pole name jest wymagane'),
  email: string().email().required(),
  age: number().min(18, 'Minimalny wiek to 18').max(115).required(),
});

type FormValues = InferType<typeof yupSchema>;

const FormInput = ({
  formik,
  accessor,
}: {
  formik: FormikProps<FormValues>;
  accessor: keyof FormValues;
}) => {
  return (
    <div>
      <TextField
        error={Boolean(formik.touched[accessor] && formik.errors[accessor])}
        helperText={
          formik.touched[accessor] && formik.errors[accessor]
            ? formik.errors[accessor]
            : null
        }
        id={accessor}
        label={accessor}
        name={accessor}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[accessor]}
      />
    </div>
  );
};

export function Form() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      age: 0,
    },
    validationSchema: yupSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInput formik={formik} accessor='name' />
      <FormInput formik={formik} accessor='email' />
      <FormInput formik={formik} accessor='age' />
      <button type='submit'>Send</button>
    </form>
  );
}
```

## Dodatkowe materiały:

[hooki w TSie](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)
[generyki, conditional types, mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ)
[utility types](https://devsmitra.medium.com/13-typescript-utility-a-cheat-sheet-for-developer-9dfd23cb1bbc)
[kurs zaawansowany tsa](https://type-level-typescript.com)

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { supabase } from './components/supabaseClient';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

async function getData() {
    const { data, error } = await supabase
        .from('your_table_name')
        .select('*');

    if (error) console.error(error);
    else console.log(data);
}

getData()

createRoot(document.getElementById("root")!).render(<App />);

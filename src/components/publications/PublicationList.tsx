"use client";

import { useState } from "react";
import { Search, FileText, Download, Code } from "lucide-react";
import { Publication } from "@/lib/types";
import { getAllPublications } from "@/lib/content";

// Note: since publications.json is static, we can import it directly for client components if we want, 
// or pass it as props. To keep it simple and SEO friendly, we'll fetch in page and pass.

// Because this needs to be a client component for search, we'll make a wrapper in page.tsx and a client component here.

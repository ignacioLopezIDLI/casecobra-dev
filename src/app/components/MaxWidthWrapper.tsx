// Importamos la función 'cn' desde el archivo de utilidades.
// Esta función se usa para combinar clases de forma segura.
import { cn } from "@/lib/utils";
import { ReactNode } from "react";


// Importamos el tipo 'ReactNode' desde React.
// 'ReactNode' representa cualquier contenido que se puede renderizar en React (texto, elementos, componentes, etc.).
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >{children} 
    </div>
  );
};

export default MaxWidthWrapper;



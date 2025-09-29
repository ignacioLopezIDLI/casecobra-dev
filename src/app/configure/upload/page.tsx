"use client";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "sonner";

const Page = () => {

  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter()

  // Codgigo Cuando un usuairio sube una imagen
  const { startUpload , isUploading } = useUploadThing("imageUploader",{
      onClientUploadComplete:([data]) =>{
         const configId = data.serverData.configId
         startTransition(() =>{
          router.push(`/configure/design?id=${configId}`)
         })
      },
      onUploadProgress(p){
        setUploadProgress(p)
      }
  })



  // Codigo cuando un usuario suelta una imagen erronea en el area de drop
  const onDropRejected = (rejectFiles: FileRejection[]) => {
    const [file] = rejectFiles;


    setIsDragOver(false);


    toast.error(`${file.file.type} no es un formato valido`, {
      description: "Porfavor sube una imagen en formato PNG, JPG o JPEG",
    });
  };

  // Codigo cuando un usuario suelta una imagen correcta en el area de drop
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, {configId: undefined})

    setIsDragOver(false);
  };

  
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className=" h-full w-full flex-1 flex flex-col items-center
                    justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed
                  className="h-6 w-6 text-zinc-500
                         mb-2"
                />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Image className="h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className=" flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Subiendo...</p>
                    <Progress className="mt-2 w-40 h-2 bh-gray-300" value={uploadProgress} />
                  </div>
                ) : isPending ? (
                  <div className=" flex flex-col items-center">
                    <p>Procesando, Porfavor espere...</p>
                  </div>
                ) : isDragOver ? (
                    <p>
                        <span className="font-semibold">Suelta el Archivo</span>{" "}
                        Para cargarlo
                    </p>
                ) : (
                  <p>
                        <span className="font-semibold">Click para cargar</span>{" "}
                        o arrastra y suelta un archivo aquí
                    </p>
                )}
              </div>

                {isPending ? null : (
                  <p className="text-xs text-zinc-500">
                    Solo se permiten archivos PNG, JPG y JPEG.
                  </p>
                )}

            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;

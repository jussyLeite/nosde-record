// src/services/demoService.ts
import { api } from "./api";

// Interface que define o que o backend espera receber
export interface DemoInput {
  nomeArtistico: string;
  email: string;
  mensagem: string;
  audioFile: File;
}

export const demoService = {
  enviarDemo: async (data: DemoInput) => {
    const formData = new FormData();
    
    // Adiciona os campos de texto e o ficheiro ao FormData
    formData.append("nomeArtistico", data.nomeArtistico);
    formData.append("email", data.email);
    formData.append("mensagem", data.mensagem);
    formData.append("file", data.audioFile); // O nome "file" deve coincidir com o @RequestParam do Spring Boot

    // Envia a requisição POST com o Content-Type correto para Multipart
    const response = await api.post("/demos/enviar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  },
};
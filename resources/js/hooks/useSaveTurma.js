// hooks/useSaveTurma.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useSaveTurma({ onSuccess }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...data }) => {
            if (id) {
                return (await api.put(`/turmas/${id}`, data)).data;
            } else {
                return (await api.post(`/turmas`, data)).data;
            }
        },
        onSuccess: (data) => {
            // Atualiza lista imediatamente
            // queryClient.setQueryData(["turmas"], (old) =>
            //     old ? old.map(t => t.id === data.id ? data : t) : [data]
            // );

            // Atualiza também o registro individual
            queryClient.setQueryData(["turma", data.id], data);

            // Garante sincronização com o backend
            // queryClient.invalidateQueries({ queryKey: ["turmas"] });
            queryClient.invalidateQueries({ queryKey: ["turma", data.id] });

            onSuccess?.(data);
        },
    });
}

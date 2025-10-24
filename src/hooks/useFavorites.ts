import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { petService } from '@/services/petService';
import { toast } from 'sonner';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();

    // Carregar favoritos do usuário
    const loadFavorites = async () => {
        if (!user) return;

        try {
            setIsLoading(true);
            const result = await petService.getUserFavorites(user.id);

            if (result.success && result.data) {
                setFavorites(result.data.map(pet => pet.id));
            } else {
                console.warn('Erro ao carregar favoritos:', result.error);
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Verificar se um pet é favorito
    const isFavorite = (petId: number): boolean => {
        return favorites.includes(petId);
    };

    // Toggle favorito
    const toggleFavorite = async (petId: number): Promise<boolean> => {
        if (!user) {
            toast.error('Você precisa estar logado para favoritar pets');
            return false;
        }

        try {
            const isCurrentlyFavorite = isFavorite(petId);

            if (isCurrentlyFavorite) {
                const result = await petService.removeFromFavorites(user.id, petId);
                if (result.success) {
                    setFavorites(prev => prev.filter(id => id !== petId));
                    toast.success('Removido dos favoritos');
                    return false;
                } else {
                    toast.error(result.error || 'Erro ao remover dos favoritos');
                    return isCurrentlyFavorite;
                }
            } else {
                const result = await petService.addToFavorites(user.id, petId);
                if (result.success) {
                    setFavorites(prev => [...prev, petId]);
                    toast.success('Adicionado aos favoritos');
                    return true;
                } else {
                    toast.error(result.error || 'Erro ao adicionar aos favoritos');
                    return isCurrentlyFavorite;
                }
            }
        } catch (error) {
            toast.error('Erro inesperado');
            console.error('Toggle favorite error:', error);
            return isFavorite(petId);
        }
    };

    // Carregar favoritos quando o usuário muda
    useEffect(() => {
        if (user) {
            loadFavorites();
        } else {
            setFavorites([]);
        }
    }, [user]);

    return {
        favorites,
        isLoading,
        isFavorite,
        toggleFavorite,
        loadFavorites
    };
};

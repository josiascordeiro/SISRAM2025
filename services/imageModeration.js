const axios = require('axios');
const FormData = require('form-data');

// Substitua com suas credenciais do Sightengine
const API_USER = '1754933694';
const API_SECRET = 'TGUd54QaC86537uRbx6sMnUsXrYRQzsq';

/**
 * Modera uma imagem usando a API Sightengine via buffer
 * @param {Buffer} imageBuffer - Buffer da imagem a ser moderada
 * @returns {Promise<Object>} - Resultado da moderação
 */
async function moderateImageBuffer(imageBuffer) {
    try {
        // Criar form data para envio
        const formData = new FormData();
        formData.append('media', imageBuffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg',
        });
        formData.append('models', 'nudity-2.1,weapon,alcohol,recreational_drug,medical,quality,offensive-2.0,faces,scam,text-content,face-attributes');
        formData.append('api_user', API_USER);
        formData.append('api_secret', API_SECRET);

        // Enviar para a API
        const response = await axios.post('https://api.sightengine.com/1.0/check.json', formData, {
            headers: formData.getHeaders()
        });
        
        // Processar o resultado
        const result = response.data;
        
        // Verificar se a imagem contém conteúdo impróprio
        const nudityScore = result.nudity?.raw || 0;
        const offensiveScore = result.offensive?.prob || 0;
        const weaponScore = result.weapon?.prob || 0;
        
        // Determinar se a imagem é apropriada (ajuste os limiares conforme necessário)
        const isAppropriate = nudityScore < 0.4 && offensiveScore < 0.4 && weaponScore < 0.4;
        
        return {
            isAppropriate,
            nudityScore,
            offensiveScore,
            weaponScore,
            rawResult: result,
            status: isAppropriate ? 'Aprovado' : 'Rejeitado',
            message: isAppropriate ? 'Imagem apropriada' : 'Possível conteúdo impróprio detectado'
        };
    } catch (error) {
        console.error('Erro ao moderar imagem:', error);
        // Em caso de erro, permitir a imagem mas marcar como não verificada
        return {
            isAppropriate: true,
            status: 'Não verificado',
            message: 'Erro na verificação da imagem'
        };
    }
}

module.exports = {
    moderateImageBuffer
};
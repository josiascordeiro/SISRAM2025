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
        console.log('Iniciando moderação de imagem...');
        console.log('Tamanho do buffer:', imageBuffer.length);
        
        const formData = new FormData();
        formData.append('media', imageBuffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg',
        });
        formData.append('models', 'nudity-2.1,weapon,alcohol,recreational_drug,medical,quality,offensive-2.0,faces,scam,text-content,face-attributes');
        formData.append('api_user', API_USER);
        formData.append('api_secret', API_SECRET);

        console.log('Enviando requisição para Sightengine...');
        const response = await axios.post('https://api.sightengine.com/1.0/check.json', formData, {
            headers: formData.getHeaders()
        });
        
        if (!response.data || !response.data.status) {
            throw new Error('Resposta inválida da API Sightengine');
        }
        
        if (response.data.status !== 'success') {
            throw new Error(`Erro na API Sightengine: ${response.data.error?.message || 'Erro desconhecido'}`);
        }
        
        console.log('Resposta recebida:', response.data);
        
        // Processar o resultado
        const result = response.data;
        
        // Verificar se a imagem contém conteúdo impróprio
        const nudityScore = result.nudity?.raw || 0;
        const offensiveScore = result.offensive?.prob || 0;
        const weaponScore = result.weapon?.prob || 0;
        
        console.log(`Scores: nudity=${nudityScore}, offensive=${offensiveScore}, weapon=${weaponScore}`);
        
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
        console.error('Erro ao moderar imagem:', error.message);
        if (error.response) {
            console.error('Detalhes do erro:', JSON.stringify(error.response.data, null, 2));
        }
        // Em caso de erro, permitir a imagem mas marcar como não verificada
        return {
            isAppropriate: true,
            status: 'Não verificado',
            message: 'Erro na verificação da imagem: ' + error.message
        };
    }
}

module.exports = {
    moderateImageBuffer
};
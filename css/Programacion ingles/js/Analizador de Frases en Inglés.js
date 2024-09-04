document.getElementById('checkBtn').addEventListener('click', analyzeSentence);

function analyzeSentence() {
    const sentenceInput = document.getElementById('sentence').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (!sentenceInput) {
        resultsDiv.innerHTML = '<p style="color: red;">Por favor, ingresa una frase.</p>';
        return;
    }

    // Verificar si la frase comienza con mayúscula y termina con un signo de puntuación adecuado
    const isWellFormatted = /^[A-Z]/.test(sentenceInput) && /[.!?]$/.test(sentenceInput);

    // Determinar el tipo de oración
    let sentenceType = '';
    if (sentenceInput.endsWith('?')) {
        sentenceType = 'Interrogativa';
    } else if (/(\bnot\b|\bno\b|\bdon't\b|\bdoesn't\b|\bcan't\b|\bwon't\b)/i.test(sentenceInput)) {
        sentenceType = 'Negativa';
    } else {
        sentenceType = 'Afirmativa';
    }

    // Simulación básica de verificación gramatical
    let grammarIssues = [];

    // 1. Verificación del uso incorrecto de "I" en minúscula
    if (/\bi\b/.test(sentenceInput)) {
        grammarIssues.push('Uso incorrecto de "I" (debe ser mayúscula).');
    }

    // 2. Verificación de la concordancia entre sujeto y verbo (simple present tense)
    const subjectVerbAgreement = {
        'i': 'am',
        'you': 'are',
        'he': 'is',
        'she': 'is',
        'it': 'is',
        'we': 'are',
        'they': 'are'
    };

    const words = sentenceInput.toLowerCase().split(/\s+/);
    if (subjectVerbAgreement[words[0]]) {
        const correctVerb = subjectVerbAgreement[words[0]];
        if (!new RegExp(`\\b${correctVerb}\\b`, 'i').test(words[1])) {
            grammarIssues.push(`Concordancia incorrecta: "${words[0]}" debe ir seguido de "${correctVerb}".`);
        }
    }

    // 3. Verificación de la posición correcta de "not" en oraciones negativas
    if (sentenceType === 'Negativa') {
        const negationPattern = /\b(not|no|don\'t|doesn\'t|can\'t|won\'t)\b/;
        if (!negationPattern.test(words[1])) {
            grammarIssues.push('La negación no está en la posición correcta.');
        }
    }

    // 4. Verificación de la estructura básica SVO (Sujeto + Verbo + Objeto)
    const basicSVO = /^[A-Z][a-z]*( (am|are|is|was|were|have|has|had|do|does|did|will|shall|can|could|would|should|might|must|may) [a-z]+)/;
    if (!basicSVO.test(sentenceInput)) {
        grammarIssues.push('Estructura básica SVO (Sujeto + Verbo + Objeto) incorrecta.');
    }

    let formattedResult = `
        <p><strong>Oración ingresada:</strong> ${sentenceInput}</p>
        <p><strong>Tipo de oración:</strong> ${sentenceType}</p>
        <p><strong>Formato de la oración:</strong> ${isWellFormatted ? 'Correcto' : 'Incorrecto'}</p>
    `;

    // Mostrar errores gramaticales
    if (grammarIssues.length > 0) {
        formattedResult += '<p style="color: red;">Errores gramaticales encontrados:</p>';
        formattedResult += `<ul style="color: red;">${grammarIssues.map(issue => `<li>${issue}</li>`).join('')}</ul>`;
    } else if (isWellFormatted) {
        formattedResult += '<p style="color: green;">La frase está bien escrita.</p>';
    } else {
        formattedResult += '<p style="color: red;">La frase no está correctamente escrita.</p>';
    }

    resultsDiv.innerHTML = formattedResult;
}


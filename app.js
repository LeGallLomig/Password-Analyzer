function analyzePassword(mdp) { //fonction qui analyse le mot de passe et retourne un score et des conseils
    let score = 0;
    const tips = [];

    const isSpecialPassword = mdp === "password" || mdp === "123456" || mdp.toLowerCase() === "azerty" || mdp.length === 67 
    || mdp === "maodezbaniel" || mdp === "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" 
    || mdp === "abcdefghijklmnopqrstuvwxyz" || mdp === "ABCDEFGHIJKLMNOPQRSTUVWXYZ" || mdp === "0123456789" 
    ||mdp ==="PaulVictor" || mdp === "paulvictor" || mdp === "PAULVICTOR" || mdp === "Paul-Victor";
    
    if (mdp === "password") {
        tips.push("...Vraiment ?");
        tips.gifName = "gifs/ishowspeed-my-mom-is-kinda-homeless.gif";
    }
    if (mdp === "123456") {
        tips.push("Vous vous foutez de moi ?!");
        tips.gifName = "gifs/are-you-serious-spiderman.gif";
    }
    if (mdp.toLowerCase() === "azerty") {
        tips.push("Je reconnais un Français là.");
        tips.gifName = "gifs/french-francais.gif";
    }
    if (mdp === "maodezbaniel"){
        tips.push("Tiens, c'est pour toi ça Maodez ❤️")
        tips.gifName = "gifs/maodez.jpg";
    }
    if (mdp ==="PaulVictor" || mdp === "paulvictor" || mdp === "PAULVICTOR" || mdp === "Paul-Victor") {
        tips.push("Bhahahahahahahahah, bah alors ? 😂");
        tips.gifName = "gifs/LE FRIEC Paul-Victor.jpg";
    }

    if (!isSpecialPassword) { // Affiche les conseils pour les mots de passe "normaux" (permet de ne pas afficher les tips pour les mdp spéciaux)
        if(mdp.length < 10) {
            tips.push("Bhahahahah votre mot de passe est trop court");
            tips.gifName = "gifs/tom-and-jerry-jerry.gif";
        }
        if(mdp.length >= 10 && mdp.length < 15) {
            score += 15;
            tips.push("C'est tout ? Vous avez une mémoire de poisson rouge ?");
            tips.gifName = "gifs/don't-think-so-guy.gif";
        }
        if(mdp.length >= 15){
            score += 30;
            tips.push("Mouais..., c'est la moindre des choses.");
            tips.gifName = "gifs/homelander-the-boys.gif";
        }

        if (/[a-z]/.test(mdp)) score += 5; else tips.push("Pourquoi que en majuscules? Mettez aussi des minuscules !");
        if (/[A-Z]/.test(mdp)) score += 5; else tips.push("Pourquoi que en minuscules? Mettez aussi des majuscules !");
        if (/[0-9]/.test(mdp)) score += 5; else tips.push("Un mot de passe sans chiffre, c'est comme un gâteau au chocolat sans chocolat, c'est triste...");
        if (/[^a-zA-Z0-9]/.test(mdp)) score += 5; else tips.push("Et les caractères spéciaux ils arrivent quand ? (!@#$...)");
    } else if (mdp.length === 67) {
        score = 67;
        tips.push("Sérieusement ? 67 caractères..., vous y avez vraiment pensé" +
            "? Je me demande bien qui est le plus fou entre vous et moi...");
        tips.gifName = "gifs/sixseven-six.gif";
    } else if (mdp === "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" || mdp === "abcdefghijklmnopqrstuvwxyz" || mdp === "ABCDEFGHIJKLMNOPQRSTUVWXYZ" || mdp === "0123456789") {
        score = 15;
        tips.push("Ah, un classique... C'est mieux que rien, mais c'est pas fou non plus.");
        tips.gifName = "gifs/tyler-hoechlin-hoech.gif";
    }

    return { score: score, tips: tips };

}

function updateStrengthBar(score) { //fonction qui met à jour la barre de force en fonction du score calculé
    const bar = document.getElementById('strengthBar');
    const percent = Math.min((score / 67) * 100, 100);
    bar.style.width = percent + '%';
    const strengthScore = document.getElementById('strengthScore');
    strengthScore.textContent = Math.round((score / 67) * 100) + '%';

    bar.className = 'BarreDeForce'; // reset les classes
    if (score <= 10)       bar.classList.add('weak');
    else if (score <= 25) bar.classList.add('medium');
    else if (score <= 40) bar.classList.add('strong');
    else                  bar.classList.add('overload');

    //Cache la barre et le % si le score est de 0
    bar.style.display = score === 0 ? 'none' : 'block';
    strengthScore.style.display = score === 0 ? 'none' : 'block';
}

function updateTips(tips) { //fonction qui met à jour les conseils affichés
    const ul = document.getElementById('tips');
    ul.innerHTML = ''; // vide la liste avant de la remplir
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        ul.appendChild(li);
    });
    
    // Gif pour chaque mot de passe spécial
    const gifContainer = document.getElementById('gifContainer');
    if (tips.gifName) {
        const imgClass = tips.gifName === 'gifs/sixseven-six.gif' ? 'sixseven-gif' : '';
        gifContainer.innerHTML = '<img src="' + tips.gifName + '" alt="gif spécial" class="' + imgClass + '" style="max-width: 100%; height: auto;">';
    } else {
        gifContainer.innerHTML = '';
    }
}

function estimateCrackTime(mdp) { //fonction qui estime le temps nécessaire pour trouver le mot de passe (grossier)
    let pool = 0;
    if (/[a-z]/.test(mdp)) pool += 5;
    if (/[A-Z]/.test(mdp)) pool += 5;
    if (/[0-9]/.test(mdp)) pool += 5;
    if (/[^a-zA-Z0-9]/.test(mdp)) pool += 22;
    if (mdp === "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" || mdp === "abcdefghijklmnopqrstuvwxyz" || mdp === "ABCDEFGHIJKLMNOPQRSTUVWXYZ" || mdp === "0123456789") {
        pool += 5;
    }

    const combinations = Math.pow(pool || 1, mdp.length);
    const attemptsPerSecond = 1e10;
    const seconds = combinations / attemptsPerSecond;

    const formatDuration = (secs) => {
        if (secs < 1) return "moins d'une seconde";

        const minute = 60;
        const hour = 3600;
        const day = 86400;
        const year = 31557600; // 365.25 jours

        if (secs < minute) return `${Math.round(secs)} seconde${Math.round(secs) === 1 ? '' : 's'}`;
        if (secs < hour) return `${Math.round(secs / minute)} minute${Math.round(secs / minute) === 1 ? '' : 's'}`;
        if (secs < day) return `${Math.round(secs / hour)} heure${Math.round(secs / hour) === 1 ? '' : 's'}`;
        if (secs < year) return `${Math.round(secs / day)} jour${Math.round(secs / day) === 1 ? '' : 's'}`;

        const years = secs / year;
        if (years < 1000) return `${Math.round(years)} an${Math.round(years) === 1 ? '' : 's'}`;
        if (years < 1e6) return `${Math.round(years / 1000)} millénaire${Math.round(years / 1000) === 1 ? '' : 's'}`;
        if (years < 1e9) return `${Math.round(years / 1e6)} million d'années`;
        return `plusieurs milliards d'années`;
    };

    const durationText = formatDuration(seconds);

    let text;
    let gifName;

    if (seconds < 1) {
        text = `J'ai mis ${durationText} à le trouver, c'est pathétique !`;
        gifName = "gifs/weak-weakness.gif";
    } else if (seconds < 60) {
        text = `Environ ${durationText}, c'est vraiment très faible...`;
        gifName = "gifs/bof-pfff.gif";
    } else if (seconds < 3600) {
        text = `Environ ${durationText}, vous me donnez du fil à retordre, mais ça reste faible !`;
        gifName = "gifs/math-hangover.gif";
    } else if (seconds < 86400) {
        text = `Environ ${durationText}, je vais aller me coucher moi...`;
        gifName = "gifs/gudnaitinis.gif";
    } else if (seconds < 3.15e7) {
        text = `Environ ${durationText}, j'ai le temps de faire le tour de la terre avant de le trouver !`;
        gifName = "gifs/earth-moon.gif";
    } else if (seconds < 3.15e9) {
        text = `Environ ${durationText}, *squelette mort, affalé au pied d un arbre*`;
        gifName = "gifs/knight-knight-meme.gif";
    } else if (seconds < 3.15e12) {
        text = `Environ ${durationText}, vous pouvez dormir tranquille (pour l'instant).`;
        gifName = "gifs/future-ram-ranch.gif";
    } else {
        text = `Environ ${durationText}... l'univers aura explosé avant que je le trouve. 🌌`;
        gifName = "gifs/big-bang-national-space-day.gif";
    }

    return { text, gifName };
}

function generatePassword(length = 16){ //fonction qui génère une mot de passe fort aléatoire
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for(let i = 0; i < length; i++){
        password += chars[array[i] % chars.length];
    }
    return password;
}

function updateCharCount(mdp) { //fonction qui met à jour le nombre de caractères affichés
    const len = mdp.length;
    document.getElementById('charCount').textContent =
        `${len} caractère${len > 1 ? 's' : ''}`;
}

function updateUI(mdp) { //fonction permettant de mettre à jour l'interface en fonction du mot de passe entré
    updateCharCount(mdp);

    if (!mdp) {
        updateStrengthBar(0);
        updateTips([]);
        document.querySelector("#crackTime strong").textContent = "";
        tips.gifName = null;
        return;
    }

    const { score, tips } = analyzePassword(mdp);
    const crackResult = estimateCrackTime(mdp);

    updateStrengthBar(score);

    tips.gifName = tips.gifName || crackResult.gifName;
    updateTips(tips);

    document.querySelector("#crackTime strong").textContent = crackResult.text;
    
    // Gif affiché dans la balise #gifContainer2, spécifique au temps de craquage
    const gifContainer2 = document.getElementById('gifContainer2');
    if (crackResult.gifName) {
        const imgClass = crackResult.gifName === 'gifs/sixseven-six.gif' ? 'sixseven-gif' : '';
        gifContainer2.innerHTML = '<img src="' + crackResult.gifName + '" alt="gif temps de craquage" class="' + imgClass + '" style="max-width: 100%; height: auto;">';
    } else {
        gifContainer2.innerHTML = '';
    }
}

const inputEl = document.getElementById("inputMdp");
const analyzeBtn = document.getElementById("analyzeBtn");
const voirLeMdp = document.getElementById("voirLeMdp");
const generatePwdBtn = document.getElementById("generatePwd");

generatePwdBtn.addEventListener("click", function() { //fonction qui génère un mot de passe aléatoire et l'affiche
    const password = generatePassword();
    document.getElementById("generatedPwd").innerHTML = `<strong>${password}</strong>`;
});


inputEl.addEventListener("input", function() { //fonction qui met à jour le nombre de caractères en temps réel
    updateCharCount(this.value);
});

analyzeBtn.addEventListener("click", function() { //fonction qui analyse le mdp et met à jour l'interface
    if (!inputEl.value.trim()) {
        // Affiche un message d'erreur si le mot de passe est vide
        const ul = document.getElementById('tips');
        ul.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = "Bah, faut écrire un truc pour que je puisse l'analyser... C'est pas compliqué pourtant !";
        ul.appendChild(li);
        
        // Réinitialise la barre de force et le temps de craquage
        updateStrengthBar(0);
        document.querySelector("#crackTime strong").textContent = "";
        document.getElementById('gifContainer').innerHTML = '';
        document.getElementById('gifContainer2').innerHTML = '';
        return;
    }
    
    updateUI(inputEl.value);
});

voirLeMdp.addEventListener("click", function() { //fonction qui permet de voir le mdp en clair 
    if (inputEl.type === "password") {
        inputEl.type = "text";
    }else {
        inputEl.type = "password";
    }
});

// Initisalise le nombre de caractères à 0 au chargement de la page
updateCharCount(inputEl.value);
// Cache la barre de force au chargement de la page
updateStrengthBar(0);

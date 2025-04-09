//I'm a lot more confident about my js, but I'm still open to suggestions. Except from you Mr.V I'm a professional software developer and ML engineer, ok? JK love you.

        var answers = [
            { proto: "méh₂tēr", meaning: "mother", protoLanguage: "mōdēr", oldLanguage: "modor", modernEnglish: "mother" },
            { proto: "bʰréh₂tēr", meaning: "brother", protoLanguage: "brōþēr", oldLanguage: "broþor", modernEnglish: "brother" },
            { proto: "swésōr", meaning: "sister", protoLanguage: "swestēr", oldLanguage: "sweostor", modernEnglish: "sister" },
            { proto: "gónu", meaning: "knee", protoLanguage: "knewą", oldLanguage: "cnēow", modernEnglish: "knee" },
            { proto: "ḱr̥d", meaning: "heart", protoLanguage: "hertô", oldLanguage: "heorte", modernEnglish: "heart" },
            { proto: "h₂óws", meaning: "ear", protoLanguage: "ausô", oldLanguage: "eare", modernEnglish: "ear" },
            { proto: "péh₂wr̥", meaning: "fire", protoLanguage: "fōr", oldLanguage: "fȳr", modernEnglish: "fire" },
            { proto: "dyḗws", meaning: "sky", protoLanguage: "𒀭𒅆𒄿𒌑𒄿𒉌", oldLanguage: "𒅆𒍑", modernEnglish: "God" },
            { proto: "sneygʷʰ-", meaning: "snow", protoLanguage: "snīwaną", oldLanguage: "snīwan", modernEnglish: "snow" },
            { proto: "h₁er-", meaning: "earth", protoLanguage: "erþō", oldLanguage: "eorþe", modernEnglish: "earth" },
            { proto: "néwos", meaning: "new", protoLanguage: "neudaz", oldLanguage: "*néwos", modernEnglish: "new" },
            { proto: "gʷṓws", meaning: "cow", protoLanguage: "kōz", oldLanguage: "cū", modernEnglish: "cow" },
            { proto: "ḱwṓ", meaning: "dog", protoLanguage: "hundaz", oldLanguage: "hund", modernEnglish: "dog" },
            { proto: "dyḗws ph₂tḗr", meaning: "Zeus", protoLanguage: "Dzéus", oldLanguage: "Ζεύς", modernEnglish: "Zeus" },
            { proto: "bʰéh₂tēr", meaning: "brother", protoLanguage: "brōþēr", oldLanguage: "broþor", modernEnglish: "brother" },
            { proto: "pṓds", meaning: "foot", protoLanguage: "pōz", oldLanguage: "fūs", modernEnglish: "foot" },
            { proto: "h₁nómn̥", meaning: "name", protoLanguage: "namô", oldLanguage: "nama", modernEnglish: "name" },
            { proto: "wódr̥", meaning: "water", protoLanguage: "watōr", oldLanguage: "wæter", modernEnglish: "water" },
            { proto: "dómos", meaning: "house", protoLanguage: "domaz", oldLanguage: "hūs", modernEnglish: "house" },
            { proto: "mr̥tós", meaning: "mortal", protoLanguage: "murtaz", oldLanguage: "morðor", modernEnglish: "mortal" },
            { proto: "bʰélh₂-", meaning: "blossom", protoLanguage: "blōz", oldLanguage: "blōstma", modernEnglish: "blossom" },
            { proto: "gʷémtos", meaning: "path", protoLanguage: "wēgaz", oldLanguage: "weg", modernEnglish: "path" }
        ];
        
        shuffle(answers);
            function shuffle(array) {
                let temp;
                let randomIndex;
                for (let index = array.length - 1; index > 0; index--) {
                    randomIndex = Math.floor(Math.random() * (index + 1));
                    temp = array[index];
                    array[index] = array[randomIndex]
                    array[randomIndex] = temp;
                }
            }

        const game       = document.getElementById("game");
        const final_word = document.getElementById("final_word");
        const end_screen = document.getElementById("end_screen");
        const final_buttons = document.getElementById("final_buttons");
        const leaderboard = document.getElementById("leaderboard");

        const guess_button = document.getElementById("guess");


        word_bank.style.display = 'none';
        game.style.display = 'none';
        end_screen.style.display = 'none';
        final_word.style.display = 'none';
        final_buttons.style.display = 'none';
        leaderboard.style.display = 'none';

        var name = ""
        
        let IsFirstTimeRunningGame = true

        const startButton = document.getElementById('startButton');

        // Add a click event listener
        startButton.addEventListener('click', function () {
            if (Name_Input.value == "") {
                alert("Please enter your name.")
                return
            }
            name = Name_Input.value.trim()
            console.log('Game Started. (WordBank) with name: ' + name);
            Name_Input.value = ""

            opening.classList.add('fade-out');

            opening.style.display = 'none';      // hide intro
            buildWordBank();                    // build the word bank
            word_bank.style.display = 'flex';    // show the word bank
            word_bank.classList.add('fade-in');  // optional fade-in class
        });
    </script>

    <script>
        function buildWordBank() {
            const continueButton = document.getElementById('continue');
            const listContainer = document.getElementById('wordBankList');
            listContainer.innerHTML = '';
            answers.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('answer_item');
                // Only modernEnglish, shown compactly
                li.innerHTML = `<strong>${item.modernEnglish}</strong>`;
                listContainer.appendChild(li);
            });
            continueButton.addEventListener('click', function () {
                word_bank.classList.remove('fade-in');
                word_bank.classList.add('fade-out');
                setTimeout(() => {
                    word_bank.style.display = 'none';
                    game.style.display = 'flex';
                    game.classList.add('fade-in');
                    game.classList.remove('fade-out');
                    if (IsFirstTimeRunningGame){
                        IsFirstTimeRunningGame = false
                        main_game();
                    }
                }, 100);
            });
        }

    </script>

    <script>
        function main_game() {
            console.log("Main Game Started")
            let points = 0;

            let hint_num = 0;

            let question = 0;

            let rounds = 5;

            const questions = document.getElementById("questions")
            const points_out = document.getElementById("points")
            points_out.textContent = `Start Guessing!`

            const hint1 = document.getElementById("hint1")
            const hint2 = document.getElementById("hint2")
            const hint3 = document.getElementById("hint3")
            const hint4 = document.getElementById("hint4")

            const input = document.getElementById("input")


            next()

            function show_word_bank(){
                buildWordBank();

                const game = document.getElementById('game'); //define game
                game.classList.add('fade-out'); //fade out game
                game.style.display = 'none'; // Hide the game screen

                buildWordBank();                    // build the word bank
                word_bank.style.display = 'flex';    // show the word bank
                word_bank.classList.add('fade-in');  // optional fade-in class                word_bank.classList.add('fade-in');  // optional fade-in class
                word_bank.classList.remove('fade-out');  // optional fade-in class

                
            }

            function check_answer() {
                console.log(hint_num)
                console.log("check answer thing")


                /*console.log(question)
                console.log(answers.length)
                console.log(input.value.trim().toLowerCase())
                points_out.textContent = `Points: ${points}`*/
                if (input.value.trim().toLowerCase() != "") {
                    if (input.value.trim().toLowerCase() == answers[question].modernEnglish.trim().toLowerCase()) {
                        console.log("Correct")
                        points_out.textContent = `${input.value.trim()} was correct!`
                        // **Add the 'correct' class to trigger the green highlight**
                        points_out.classList.add('correct');

                        // **Remove the 'correct' class after the animation completes (1s)**
                        setTimeout(() => {
                            points_out.classList.remove('correct');
                        }, 1000); // Duration matches the CSS animation duration
                        question++
                        questions.textContent = `${question + 1}/${rounds}`
                        hint_num = 0
                        hint1.textContent = ""
                        hint2.textContent = ""
                        hint3.textContent = ""
                        hint4.textContent = ""
                        next()
                    } else {
                        points++;
                        points_out.textContent = `Points: ${points}`
                        console.log("Incorrect")
                        console.log(hint_num)
                        if (hint_num == 4) {
                            question++;
                            questions.textContent = `${question + 1}/${rounds}`
                            hint_num = 0

                        }
                        next()
                        return

                    }
                } else {
                    alert("Please enter a word.")
                    console.log("input box empty")
                    return
                }
            }
            function handleKeyDown(event) {
                if (event.key === 'Enter') {
                console.log("chack answer enter")
                check_answer();
                }
            }

            // 3) attach event listeners HERE
            word_bank_button.addEventListener('click', show_word_bank);
            guess_button.addEventListener('click', check_answer);
            guess_button.addEventListener('click', function(){console.log("check answer button")});
            document.addEventListener('keydown', handleKeyDown);



            function next() {
                if (question == rounds) {
                    showEndScreen(points);
                    final_word.classList.add('fade-in');
                    final_word.style.display = 'flex';
                    setTimeout(() => {
                        final_word.classList.add('fade-out');
                        

                    }, 3000);
                    setTimeout(() => {
                        final_word.style.display = 'none';
                        final_buttons.classList.add('fade-in');
                        final_buttons.style.display = 'flex';
                    }, 3900);
                    return
                }
                input.value = ""

                if (hint_num == 0) {
                    hint1.textContent = ""
                    hint2.textContent = ""
                    hint3.textContent = ""
                    hint4.textContent = ""
                    hint1.textContent = `Proto: ${answers[question].proto}`;
                    hint_num++
                } else if (hint_num == 1) {
                    hint2.textContent = `Proto Language: ${answers[question].protoLanguage}`;
                    hint_num++
                } else if (hint_num == 2) {
                    hint3.textContent = `Old English: ${answers[question].oldLanguage}`;
                    hint_num++
                } else if (hint_num == 3) {
                    hint4.textContent = `Modern English: ${answers[question].modernEnglish}`;
                    hint_num = 4
                    //hint_num = 0
                    questions.textContent = `${question + 1}/${rounds}`
                } else if (true) { }
            }

            function showEndScreen(final) {
                document.getElementById('final_word_text').textContent = `${input.value.trim()} was correct!`; // Set the final message
                document.removeEventListener('keydown', handleKeyDown);
                guess_button.removeEventListener('click', check_answer);

                reset_button = document.getElementById('play_again');
                clearLeaderboard_button = document.getElementById('clear_leaderboard');
                clearLeaderboard_button.addEventListener('click', clearLeaderboard);
                reset_button.addEventListener('click', function () {
                    location.reload(true);
                });
                
                const game = document.getElementById('game'); //define game
                game.classList.add('fade-out'); //fade out game
                game.style.display = 'none'; // Hide the game screen


                // Show and fade in the end screen
                end_screen.style.display = 'flex';
                end_screen.classList.add('fade-in');
                document.getElementById('final').textContent = `${name}, you got a final score of ${final}. Thanks for playing!`; // Set the final message

                updateLeaderboard(final, name);

                // Display the leaderboard
                displayLeaderboard();

            }
        
            function updateLeaderboard(score, name) {
                const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                leaderboard.push({ name: name || "Anonymous", score });
                leaderboard.sort((a, b) => a.score - b.score); // Sort by score (lower is better)
                localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
            }
            function displayLeaderboard() {
                const leaderboardContainer = document.getElementById('leaderboard');
                const leaderboardList = document.getElementById('leaderboardList');
                leaderboardContainer.classList.add('fade-in');
                leaderboardContainer.style.display = 'flex';

                const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                leaderboardList.innerHTML = ''; // Clear existing items
                leaderboard.forEach((entry, index) => {
                    const li = document.createElement('li');
                    li.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
                    leaderboardList.appendChild(li);
                });
            }
            function clearLeaderboard() {
                const leaderboardList = document.getElementById('leaderboardList');
                
                // Add fade-out animation to each list item
                Array.from(leaderboardList.children).forEach(li => {
                    li.classList.add('fade-out-list');
                });

                // Wait for the fade-out animation to complete
                setTimeout(() => {
                    // Clear leaderboard after fade out
                    localStorage.removeItem('leaderboard');
                    
                    // Rerender the leaderboard with fade-in animation
                    displayLeaderboardWithFadeIn();
                }, 500); // Matches the duration of the fade-out animation
            }

            function displayLeaderboardWithFadeIn() {
                const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
                const leaderboardList = document.getElementById('leaderboardList');

                leaderboardList.innerHTML = ''; // Clear existing items

                leaderboard.forEach((entry, index) => {
                    const li = document.createElement('li');
                    li.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
                    li.classList.add('fade-in-list'); // Add fade-in animation
                    leaderboardList.appendChild(li);
                });
            }
        }
        




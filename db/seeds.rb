# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

light_blue = Color.create({ name: 'Light Blue', hexcode: '#AAE0F7'})
orange = Color.create({ name: 'Orange', hexcode: '#FB971D'})
yellow = Color.create({ name: 'Yellow', hexcode: '#FFFF00'})
blue = Color.create({ name: 'Blue', hexcode: '#1245A8'})
fuschia = Color.create({ name: 'Fuschia', hexcode: '#FF00FF'})
brown = Color.create({ name: 'Brown', hexcode: '#945336'})
red = Color.create({ name: 'Red', hexcode: '#ED1B23'})
green = Color.create({ name: 'Green', hexcode: '#008000'})

diff_format = TileGroup.create({ name: 'Different Formats', description: '', color: red })
author = TileGroup.create({ name: 'Author', description: '', color: yellow })
new_release = TileGroup.create({ name: 'New Releases', description: '', color: fuschia })
metadata = TileGroup.create({ name: 'Metadata', description: '', color: orange })
genre = TileGroup.create({ name: 'Genre', description: '', color: green })
translation = TileGroup.create({ name: 'Books in Translation', description: '', color: blue })
title = TileGroup.create({ name: 'Title', description: '', color: light_blue })
non_fiction = TileGroup.create({ name: 'Non Fiction', description: '', color: brown })

number = Tile.create({ name: 'Number in Title', description: 'Read a book with a number in the title', tile_group: title })
day_time = Tile.create({ name: 'Day or Time in Title', description: 'Read a book with a day or time in the title', tile_group: title })
award = Tile.create({ name: 'Award Winning', description: 'Read a book that has won an award', tile_group: metadata })
before_1950 = Tile.create({ name: 'Released Before 1950', description: 'Read a book that was released before 1950', tile_group: metadata })
debut = Tile.create({ name: 'Debut Author', description: 'Read a book by a debut author', tile_group: author })
under_30 = Tile.create({ name: 'Author Under 30', description: 'Read a book by an author under 30', tile_group: author })
asia = Tile.create({ name: 'Language Spoken in Asia', description: 'Read a book that has been translated into English from a language spoken in Asia', tile_group: translation })
europe = Tile.create({ name: 'Language Spoken in Europe', description: 'Read a book that has been translated into English from a language spoken in Europe', tile_group: translation })
this_year = Tile.create({ name: 'Released This Year', description: 'Read a book that was released this year', tile_group: new_release })
this_decade = Tile.create({ name: 'Released This Decade', description: 'Read a book that was released this decade', tile_group: new_release })
memoir = Tile.create({ name: 'Memoir', description: 'Read a memoir', tile_group: non_fiction })
political = Tile.create({ name: 'Political', description: 'Read a political book', tile_group: non_fiction })
audiobook = Tile.create({ name: 'Audiobook', description: 'Listen to an audiobook', tile_group: diff_format })
graphic_novel = Tile.create({ name: 'Graphic Novel', description: 'Read a graphic novel', tile_group: diff_format })
sci_fi = Tile.create({ name: 'Sci-Fi', description: 'Read a sci-fi book', tile_group: genre })
fantasy = Tile.create({ name: 'Fantasy', description: 'Read a fantasy book', tile_group: genre })

murakami = Book.create({ name: '1Q84', author: 'Haruki Murakami', cover_image: '', genre: '', isbn: '0' })
mandel = Book.create({ name: 'Station 11', author: 'Emily St John Mandel', cover_image: '', genre: '', isbn: '0' })
martel = Book.create({ name: 'Life of Pi', author: 'Yann Martel', cover_image: '', genre: '', isbn: '0' })
han = Book.create({ name: 'The Summer I Turned Pretty', author: 'Jenny Han', cover_image: '', genre: '', isbn: '0' })
paralkar = Book.create({ name: 'Night Theatre', author: 'Vikram Paralkar', cover_image: '', genre: '', isbn: '0' })
welch = Book.create({ name: 'Winter in the Blood', author: 'James Welch', cover_image: '', genre: '', isbn: '0' })
thammavongsa = Book.create({ name: 'How To Pronounce Knife', author: 'Souvankham Thammavongsa', cover_image: '', genre: '', isbn: '0' })
james = Book.create({ name: 'The Brief History Of Seven Killings', author: 'Marlon James', cover_image: '', genre: '', isbn: '0' })
walker = Book.create({ name: 'The Color Purple', author: 'Alice Walker', cover_image: '', genre: '', isbn: '0' })
hurston = Book.create({ name: 'Their Eyes Were Watching God', author: 'Nora Zeale Hurston', cover_image: '', genre: '', isbn: '0' })
soseki = Book.create({ name: 'I Am A Cat', author: 'Natsume Soseki', cover_image: '', genre: '', isbn: '0' })
paz = Book.create({ name: 'The Labyrinth of Solitude', author: 'Octavio Paz', cover_image: '', genre: '', isbn: '0' })
orange = Book.create({ name: 'There There', author: 'Tommy Orange', cover_image: '', genre: '', isbn: '0' })
taylor = Book.create({ name: 'Real Life', author: 'Brandon Taylor', cover_image: '', genre: '', isbn: '0' })
awad = Book.create({ name: 'Bunny', author: 'Mona Awad', cover_image: '', genre: '', isbn: '0' })
vuong = Book.create({ name: 'The Night Sky with Exit Wounds', author: 'Ocean Vuong', cover_image: '', genre: '', isbn: '0' })
smith = Book.create({ name: 'White Teeth', author: 'Zadie Smith', cover_image: '', genre: '', isbn: '0' })
brosch = Book.create({ name: 'Hyperbole And A Half', author: 'Alie Brosch', cover_image: '', genre: '', isbn: '0' })
ogawa = Book.create({ name: 'The Memory Police', author: 'Yoko Ogawa', cover_image: '', genre: '', isbn: '0' })
miaojin = Book.create({ name: 'Notes of a Crocodile', author: 'Qiu Miaojin', cover_image: '', genre: '', isbn: '0' })
mishima = Book.create({ name: 'Confessions of a Mask', author: 'Yukio Mishima', cover_image: '', genre: '', isbn: '0' })
marquez = Book.create({ name: '100 Years of Solitude', author: 'Gabriel Garcia Marquez', cover_image: '', genre: '', isbn: '0' })
cardoso = Book.create({ name: 'Chronicle of the Murdered House', author: 'Luico Cardoso', cover_image: '', genre: '', isbn: '0' })
duras = Book.create({ name: 'Blue Eyes, Black Hair', author: 'Marguerite Duras', cover_image: '', genre: '', isbn: '0' })
jemisin = Book.create({ name: 'The City We Became', author: 'N.K. Jemisin', cover_image: '', genre: '', isbn: '0' })
king = Book.create({ name: 'Indians on Vacation', author: 'Thomas King', cover_image: '', genre: '', isbn: '0' })
staples = Book.create({ name: 'This Town Sleeps', author: 'Dennis E Staples', cover_image: '', genre: '', isbn: '0' })
mcbride = Book.create({ name: 'Deacon King Kong', author: 'James McBride', cover_image: '', genre: '', isbn: '0' })
offill = Book.create({ name: 'Weather', author: 'Jenny Offill', cover_image: '', genre: '', isbn: '0' })
clarke = Book.create({ name: 'Piranesi', author: 'Susanna Clarke', cover_image: '', genre: '', isbn: '0' })
murakami2 = Book.create({ name: 'What I Talk About When I Talk About Running', author: 'Haruki Murakami', cover_image: '', genre: '', isbn: '0' })
nixon = Book.create({ name: 'Nitisanak', author: 'Lindsay Nixon', cover_image: '', genre: '', isbn: '0' })
noah = Book.create({ name: 'Born A Crime', author: 'Trevor Noah', cover_image: '', genre: '', isbn: '0' })
banerjee = Book.create({ name: 'Good Economics for Hard Times', author: 'Abhijit V. Banerjee', cover_image: '', genre: '', isbn: '0' })
obama_m = Book.create({ name: 'Becoming', author: 'Michelle Obama', cover_image: '', genre: '', isbn: '0' })
obama_b = Book.create({ name: 'A Promised Land', author: 'Barack Obama', cover_image: '', genre: '', isbn: '0' })
gaiman = Book.create({ name: 'The Graveyard Book', author: 'Neil Gaiman', cover_image: '', genre: '', isbn: '0' })
saunders = Book.create({ name: 'Lincoln In The Bardo', author: 'George Saunders', cover_image: '', genre: '', isbn: '0' })
cole = Book.create({ name: 'The Skin We’re In', author: 'Desmond Cole', cover_image: '', genre: '', isbn: '0' })
speigelman = Book.create({ name: 'Maus', author: 'Art Speigelman', cover_image: '', genre: '', isbn: '0' })
takei = Book.create({ name: 'They Called Us Enemy', author: 'George Takei', cover_image: '', genre: '', isbn: '0' })
vaugn = Book.create({ name: 'Paper Girls', author: 'Brian K Vaughn', cover_image: '', genre: '', isbn: '0' })
cixin = Book.create({ name: 'The Three Body Problem', author: 'Liu Cixin', cover_image: '', genre: '', isbn: '0' })
jemisin2 = Book.create({ name: 'The Fifth Season', author: 'N.K. Jemisin', cover_image: '', genre: '', isbn: '0' })
weir = Book.create({ name: 'The Martian', author: 'Andy Weir', cover_image: '', genre: '', isbn: '0' })
adeyemi = Book.create({ name: 'Children Of Blood And Bone', author: 'Tomi Adeyemi', cover_image: '', genre: '', isbn: '0' })
nicholson = Book.create({ name: 'Love Beyond Body Space and Time', author: 'Hope Nicholson', cover_image: '', genre: '', isbn: '0' })
moreon_garcia = Book.create({ name: 'Gods of Jade and Shadow', author: 'Silvia Moreno-Garcia', cover_image: '', genre: '', isbn: '0' })

murakamiR = Recommendation.create({ tile: number, book: murakami })
mandelR = Recommendation.create({ tile: number, book: mandel })
martelR = Recommendation.create({ tile: number, book: martel })
hanR = Recommendation.create({ tile: day_time, book: han })
paralkarR = Recommendation.create({ tile: day_time, book: paralkar })
welchR = Recommendation.create({ tile: day_time, book: welch })
thammavongsaR = Recommendation.create({ tile: award, book: thammavongsa })
jamesR = Recommendation.create({ tile: award, book: james })
walkerR = Recommendation.create({ tile: award, book: walker })
hurstonR = Recommendation.create({ tile: before_1950, book: hurston })
sosekiR = Recommendation.create({ tile: before_1950, book: soseki })
pazR = Recommendation.create({ tile: before_1950, book: paz })
orangeR = Recommendation.create({ tile: debut, book: orange })
taylorR = Recommendation.create({ tile: debut, book: taylor })
awadR = Recommendation.create({ tile: debut, book: awad })
vuongR = Recommendation.create({ tile: under_30, book: vuong })
smithR = Recommendation.create({ tile: under_30, book: smith })
broschR = Recommendation.create({ tile: under_30, book: brosch })
ogawaR = Recommendation.create({ tile: asia, book: ogawa })
miaojinR = Recommendation.create({ tile: asia, book: miaojin })
mishimaR = Recommendation.create({ tile: asia, book: mishima })
marquezR = Recommendation.create({ tile: europe, book: marquez })
cardosoR = Recommendation.create({ tile: europe, book: cardoso })
durasR = Recommendation.create({ tile: europe, book: duras })
jemisinR = Recommendation.create({ tile: this_year, book: jemisin })
kingR = Recommendation.create({ tile: this_year, book: king })
staplesR = Recommendation.create({ tile: this_year, book: staples })
mcbrideR = Recommendation.create({ tile: this_decade, book: mcbride })
offillR = Recommendation.create({ tile: this_decade, book: offill })
clarkeR = Recommendation.create({ tile: this_decade, book: clarke })
murakami2R = Recommendation.create({ tile: memoir, book: murakami2 })
nixonR = Recommendation.create({ tile: memoir, book: nixon })
noahR = Recommendation.create({ tile: memoir, book: noah })
banerjeeR = Recommendation.create({ tile: political, book: banerjee })
obama_mR = Recommendation.create({ tile: political, book: obama_m })
obama_bR = Recommendation.create({ tile: political, book: obama_b })
gaimanR = Recommendation.create({ tile: audiobook, book: gaiman })
saundersR = Recommendation.create({ tile: audiobook, book: saunders })
coleR = Recommendation.create({ tile: audiobook, book: cole })
speigelmanR = Recommendation.create({ tile: graphic_novel, book: speigelman })
takeiR = Recommendation.create({ tile: graphic_novel, book: takei })
vaugnR = Recommendation.create({ tile: graphic_novel, book: vaugn })
cixinR = Recommendation.create({ tile: sci_fi, book: cixin })
jemisin2R = Recommendation.create({ tile: sci_fi, book: jemisin2 })
weirR = Recommendation.create({ tile: sci_fi, book: weir })
adeyemiR = Recommendation.create({ tile: fantasy, book: adeyemi })
nicholsonR = Recommendation.create({ tile: fantasy, book: nicholson })
moreon_garciaR = Recommendation.create({ tile: fantasy, book: moreon_garcia })

jake = User.create({ name: 'Jake', email: 'jake@email.com', password: 'password' })
cassie = User.create({ name: 'Cassie', email: 'cassie@email.com', password: 'password' })
rachel = User.create({ name: 'Rachel', email: 'rachel@email.com', password: 'password' })

papercut = Card.create({name: 'Papercut', description: 'OW! You got a papercut and lost track of what page you are on.', effect: 'Points', outcome: -2 })
spelling = Card.create({name: 'Spelling', description: 'Your latest book gets published! But it looks like there are a few spelling mistakes on the cover…', effect: 'Points', outcome: -2 })
coffee = Card.create({name: 'Coffee', description: 'Ugh oh! You drink some coffee while reading and spill it all over yourself.', effect: 'Points', outcome: -1 })
late_fees = Card.create({name: 'Late Fees', description: 'Late fees add up! Time to pay them back!', effect: 'Points', outcome: -1 })
no_sales = Card.create({name: 'No Sales', description: 'Congratulations you just got published! But no one buys your book…', effect: 'Points', outcome: -1 })
# speed_reading = Card.create({name: 'Speed Reading', description: 'You win the speed reading championship!', effect: 'Points', outcome: 2 })
# library_card = Card.create({name: 'Library Card', description: 'Yay! You got a library card!', effect: 'Points', outcome: 1 })
# rain = Card.create({name: 'Rain', description: 'It starts to rain so you spend the day inside reading, nice work!', effect: 'Points', outcome: 2 })
# reading_to_children = Card.create({name: 'Reading to Children', description: 'You spend the afternoon reading to children, very saintly of you!', effect: 'Points', outcome: 1 })
# published = Card.create({name: 'Published', description: 'Congratulations you just got published! It’s a hit!', effect: 'Points', outcome: 2 })

game1 = Game.create({name: 'Game1', user: jake})
game2 = Game.create({name: 'Game2', user: jake})
game3 = Game.create({name: 'Real Game', user: jake})
game4 = Game.create({name: 'Game4', user: jake, ended_at: '10/27/20'})
game5 = Game.create({name: 'Game5', user: jake, ended_at: '10/27/20'})
game6 = Game.create({name: 'Game6', user: cassie})
game7 = Game.create({name: 'Game7', user: cassie})

player1 = Player.create({game: game1, user: jake})
player2 = Player.create({game: game2, user: jake})
player3 = Player.create({game: game3, user: jake})
player4 = Player.create({game: game4, user: jake})
player5 = Player.create({game: game5, user: jake})
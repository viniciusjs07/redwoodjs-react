import { db } from 'api/src/lib/db';

import { hashPassword } from '@redwoodjs/auth-dbauth-api';

export default async () => {
  try {
    const POSTS = [
      {
        id: 1,
        title: 'Welcome to the blog!',
        body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
      },
      {
        id: 2,
        title: 'A little more about me',
        body: "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
      },
      {
        id: 3,
        title: 'What is the meaning of life?',
        body: 'Meh waistcoat succulents umami asymmetrical, hoodie post-ironic paleo chillwave tote bag. Trust fund kitsch waistcoat vape, cray offal gochujang food truck cloud bread enamel pin forage. Roof party chambray ugh occupy fam stumptown. Dreamcatcher tousled snackwave, typewriter lyft unicorn pabst portland blue bottle locavore squid PBR&B tattooed.',
      },
    ];

    const users = [
      {
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin@admin',
        roles: 'admin',
      },
    ];
    console.log(
      "\nUsing the default './scripts/seed.ts' template\nEdit the file to add seed data\n"
    );

    if ((await db.user.count()) === 0) {
      for (const user of users) {
        const [hashedPassword, salt] = hashPassword(user.password);
        const record = await db.user.create({
          data: {
            name: user.name,
            email: user.email,
            roles: user.roles,
            hashedPassword,
            salt,
          },
        });

        console.log('User default created', record.name);

        if ((await db.post.count()) === 0) {
          for (const post of POSTS) {
            await db.post.upsert({
              where: { id: post.id },
              create: { userId: record.id, ...post },
              update: {},
            });
            console.log(`  Create Post "${post.title}"`);
          }
        }
      }
    } else {
      console.log('Users already seeded');
    }
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  }
};

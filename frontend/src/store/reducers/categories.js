export const categories = [
    {
      name: { name: 'Electronic & Computers', to: 'electronic&computers' },
      id: 'd1',
      children: [
        { title: 'Electronics' },
        { name: 'TV & Video', to: 'tv&video' },
        { name: 'Home Audio & Theater', to: 'home_audio&theater' },
        { name: 'Camera, Photo & Video', to: 'camera&photo&video' },
        { name: 'Cell Phones & Accessories', to: 'cell_phones&accessories' },
        { name: 'Headphones', to: 'headphones' },
        { name: 'Car Electronics', to: 'car_electronics' },
      ],
      type: 'department',
    },
    {
      name: { name: 'Sports & Outdoors', to: 'sports&outdoors' },
      id: 'd2',
      children: [
        { title: 'Sports' },
        { name: 'Athletic Clothing', to: 'athletic_clothing' },
        { name: 'Fitness', to: 'fitness', id: 't2' },
        { name: 'Hunting & Fishing', to: 'hunting&fishing', desc: 'summer time 20% off', id: 'c1' },
        { name: 'Golf', to: 'golf' },
      ],
      type: 'department',
    },
    {
      name: { name: 'Hunting & Fishing', to: 'hunting&fishing' },
      id: 'c1',
      children: [
        { name: 'Hunting', to: 'hunting', id: 't1' },
        { name: 'Fishing', to: 'fishing', desc: 'summer time 20% off' },
        { name: 'Shooting', to: 'shooting' },
        { name: 'Archery', to: 'Archery' },
      ],
      type: 'category',
    },
    {
      name: { name: 'Hunting', to: 'hunting' },
      id: 't1',
      children: [
        { name: 'Gun Safety', to: 'gun_safety' },
        { name: 'Hunting Knives', to: 'hunting_knives' },
        { name: 'Bags & Packs', to: 'bags&packs' },
        { name: 'Tree Stands, Blinds & Accessories', to: 'tree_stands&blinds&accessories' },
      ],
      type: 'types',
    },
    {
      name: { name: 'Fitness', to: 'fitness' },
      id: 't2',
      children: [
        { name: 'Running machine', to: 'running_machine' },
        { name: 'Yoga Ball', to: 'yoga_ball' },
      ],
      type: 'category',
    },
  ]

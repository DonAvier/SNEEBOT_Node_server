const Role = (index) => {
    const roles = {
        None: 0,
        Coordinate: 1,
        Button: 2,
        Link: 3,
        Radio: 4,
        Checkbox: 5,
        Textbox: 6,
        Heading: 7,
        List: 8,
        ListItem: 9,
        Menu: 10,
        MenuItem: 11,
        Combobox: 12,
        Dialog: 13,
        Tabpanel: 14,
        Tab: 15,
        Alert: 16,
        Progressbar: 17,
        Slider: 18,
        Switch: 19,
        Grid: 20,
        Cell: 21,
        Img: 22,
        Form: 23,
        Search: 24,
        Navigation: 25,
        Main: 26,
        Complementary: 27,
        Banner: 28,
        Contentinfo: 29,
        Region: 30,
        Status: 31,
        Tooltip: 32,
    };

    return Object.keys(roles).find((key) => roles[key] === index);
};

module.exports = { Role };

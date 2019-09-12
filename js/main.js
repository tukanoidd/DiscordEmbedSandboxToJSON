$(document).ready(() => {
    var switches = {
        content: false,
        title: false,
        url: false,
        icon: false,
        useVars: false
    };

    var code = {
        content: '',
        embed: {
            title: '',
            description: '',
            url: '',
            color: '',
            footer: {
                text: ''
            },
            thumbnail: {
                url: ''
            },
            author: {
                name: '',
                url: '',
                icon_url: ''
            },
            fields: []
        }
    };

    $(document).on('click', '.field_delete', (e) => {
        $(e.target).parent().remove();
    });

    $('#field_add').click((e) => {
        let div = $("<div class='field'></div>")
            .append($("<input class='field_name input_text' placeholder='name' type='text'>"))
            .append($("<input class='field_value input_text' placeholder='value' type='text'>"))
            .append($("<input class='field_inline' type='checkbox'>"))
            .append($("<label>Inline</label>"))
            .append($("<input class='field_delete' type='button' value='Remove Field'>"));
        $(e.target).before(div);
    });

    $('#generate_code').click((e) => {
        code.embed.fields = [];
        code.content = $('#content').val();
        code.embed.title = $('#title').val();
        code.embed.description = $('#description').val();
        code.embed.url = $('#url').val();
        code.embed.color = parseInt($('#color').val().replace('#', '0x'));
        code.embed.footer.text = $('#footer_text').val();
        code.embed.thumbnail.url = $('#icon').val();
        code.embed.author.name = $('#author_name').val();
        code.embed.author.url = $('#url').val();
        code.embed.author.icon_url = $('#author_icon').val();

        $('.field').each((index, elem) => {
            code.embed.fields.push({
                name: $(elem).children('.field_name').val(),
                value: $(elem).children('.field_value').val(),
                inline: $(elem).children('.field_inline')[0].checked
            });
        });

        $('.json_code').text(JSON.stringify(code, null, 4));
    });

    $('#cpy_to_clipboard').click((e) => {
        copyStringToClipboard(JSON.stringify(JSON.parse($('.json_code').text())));
    });
});

function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

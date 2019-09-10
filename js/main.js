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
            author: {
                name: '',
                url: '',
                icon_url: ''
            },
            description: '',
            url: '',
            thumbnail: {
                url: ''
            },
            color: '',
            fields: [],
            footer: {
                text: ''
            }
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
        code.embed.color = $('#color').val();
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
});

from googletrans import Translator


def g_translate(text, lang):
    try:
        translator = Translator()
        text_parts = text.split('. ')
        return ' '.join(translator.translate(
                parts, src='en', dest=lang).text for parts in text_parts) + '.'
    except Exception as e:
        print('Error in translate', e)
        return 'Some Issue in backend'
